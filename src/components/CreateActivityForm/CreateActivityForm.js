import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { API, graphqlOperation } from 'aws-amplify';
import Storage from '@aws-amplify/storage';
import { createActivity } from '../../graphql/mutations';
import FitParser from 'fit-file-parser';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SufferPalLogo from '../../assets/logo-sufferpal.png';
import './CreateActivityForm.scss';

const UploadActivity = () => {
  const [activity, setActivity] = useState({});
  const userID = useSelector((state) => state.user.id);
  const [activityDescription, setActivityDescription] = useState('');

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
          speedUnit: 'mph',
          lengthUnit: 'mi',
          temperatureUnit: 'fahrenheit',
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

  const handleCreateActivityFormSubmit = (event) => {
    event.preventDefault();

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
      customActivityData['description'] = activityDescription;

      // Add stringified version of raw measurements
      // into S3 at file path defined above
      Storage.put(rawMeasurementsFileName, blob).then((result) => {
        customActivityData['rawMeasurementsS3FileKey'] = result.key;

        addActivity(customActivityData);
      });
    }
  };

  const handleActivityDescriptionOnChange = (event) => {
    const { value } = event.target;

    setActivityDescription(value);
  };

  return (
    <div className="CreateActivityForm py-2 px-4 mb-3">
      <img className="sufferpal-logo" src={SufferPalLogo} alt="SufferPal Logo" />
      <Form noValidate onSubmit={handleCreateActivityFormSubmit}>
        <div sm="8" className="upload-cont">
          <FormGroup className="p-2 m-0 mb-1">
            <Label for="fitFileUpload" className="upload-label">
              FIT FILE DROPBOX
            </Label>
            <div {...getRootProps()}>
              <input
                {...getInputProps({
                  type: 'file',
                  name: 'fitFile',
                  id: 'fitFileUpload',
                })}
              />
              <FormText className="upload-text">
                {isDragActive ? (
                  <p>Drop your FIT FILE here ...</p>
                ) : (
                  <p>Drop a FIT FILE here, or click to select FIT FILE</p>
                )}
              </FormText>
            </div>
          </FormGroup>
        </div>
        <div className="d-flex align-items-end description-submit-cont">
          <FormGroup className="description-form-grp p-2 mr-2 m-0">
            <Label for="activityDescription" className="descr-label">
              DESCRIPTION
            </Label>
            <Input
              type="textarea"
              onChange={handleActivityDescriptionOnChange}
              name="activityDescription"
              id="activityDescription"
            />
          </FormGroup>
          <Button className="flex-grow-1 submit-btn">SUBMIT ACTIVITY</Button>
        </div>
      </Form>
    </div>
  );
};

export default UploadActivity;
