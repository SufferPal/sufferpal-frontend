import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { API, graphqlOperation } from 'aws-amplify';
import Storage from '@aws-amplify/storage';
import { createActivity } from '../../graphql/mutations';
import FitParser from 'fit-file-parser';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './CreateActivityForm.scss';

const UploadActivity = () => {
  const [activity, setActivity] = useState({});
  const userID = useSelector((state) => state.user.id);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.onload = () => {
        const binaryString = reader.result;
        // Create a FitParser instance (options argument is optional)
        const fitParser = new FitParser({
          force: true,
          speedUnit: 'km/h',
          lengthUnit: 'km',
          temperatureUnit: 'kelvin',
          elapsedRecordField: true,
          mode: 'list',
        });

        // Parse your file
        fitParser.parse(binaryString, function (error, data) {
          setActivity(data);
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addActivity = async (activity) => {
    await API.graphql(graphqlOperation(createActivity, { input: activity }));
  };

  useEffect(() => {
    const isActivityEmpty = Object.entries(activity).length === 0;
    const customActivityData = {};

    if (!isActivityEmpty) {
      if (activity?.sessions) {
        customActivityData['totalCalories'] = activity?.sessions[0]?.total_calories;
        customActivityData['startTime'] = activity?.sessions[0]?.start_time;
        customActivityData['totalMovingTime'] = activity?.sessions[0]?.total_moving_time;
        customActivityData['maxCadence'] = activity?.sessions[0]?.max_cadence;
        customActivityData['minHeartRate'] = activity?.sessions[0]?.min_heart_rate;
        customActivityData['avgSpeed'] = activity?.sessions[0]?.avg_speed;
        customActivityData['maxHeartRate'] = activity?.sessions[0]?.max_heart_rate;
        customActivityData['totalDistance'] = activity?.sessions[0]?.total_distance;
        customActivityData['avgCadence'] = activity?.sessions[0]?.avg_cadence;
        customActivityData['sport'] = activity?.sessions[0]?.sport;
        customActivityData['avgHeartRate'] = activity?.sessions[0]?.avg_heart_rate;
      }

      // Creating a stringified version of raw measurements
      const stringifiedRawMeasurements = JSON.stringify(activity?.records);
      // Create new blob with JSON version of raw measurements to send to S3
      const blob = new Blob([stringifiedRawMeasurements], { type: 'application/json' });
      // Create S3 file path
      const rawMeasurementsFileName = `Fit Files/${userID}/fit_${Date.now()}`;

      customActivityData['userID'] = userID;

      // Add stringified version of raw measurements
      // into S3 at file path defined above
      Storage.put(rawMeasurementsFileName, blob).then((result) => {
        customActivityData['rawMeasurementsS3FileKey'] = result.key;

        addActivity(customActivityData);
      });
    }
  }, [activity, userID]);

  return (
    <>
      <div {...getRootProps()}>
        <Input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
    </>
  );
};

export default UploadActivity;
