import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { API, graphqlOperation } from 'aws-amplify';
import { createActivity } from '../../graphql/mutations';
import { getActivity } from '../../graphql/queries';
// Require the module
import FitParser from 'fit-file-parser';
// // Read a .FIT file
// const fs = require('fs');

const Upload = () => {
  const [activity, setActivity] = useState({});
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    //console.log(typeof acceptedFiles[0]);

    acceptedFiles.forEach((file) => {
      //console.log(file);
      //console.log(JSON.stringify(file));
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.onload = () => {
        const binaryString = reader.result;
        //console.log(JSON.stringify(binaryString));
        // console.log(binaryString);
        // fs.readFile('./example.fit', function (err, content) {
        //   // Create a FitParser instance (options argument is optional)
        const fitParser = new FitParser({
          force: true,
          speedUnit: 'km/h',
          lengthUnit: 'km',
          temperatureUnit: 'kelvin',
          elapsedRecordField: true,
          mode: 'list',
        });

        //   // Parse your file
        fitParser.parse(binaryString, function (error, data) {
          // Handle result of parse method
          //   if (error) {
          //     console.log(error);
          //   } else {
          //     console.log(JSON.stringify(data));
          //   }
          //console.log(data);
          setActivity(data);
        });
        // });
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addActivity = async (activity) => {
    await API.graphql(graphqlOperation(createActivity, { input: activity }));
  };

  // useEffect(() => {
  //   fetchActivity();
  // }, []);

  // const fetchActivity = async () => {
  //   const activityData = await API.graphql(
  //     graphqlOperation(getActivity, { id: '3ac0b53c-39d0-4e6f-b50c-ecff62bc11a4' })
  //   );
  //   console.log(activityData.data.getActivity.records);
  // }

  useEffect(() => {
    const customActivityData = {};

    //console.log(activity);
    //console.log(activity.sessions);
    //console.log(activity?.activity?.sessions[0].total_distance);
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

    //customActivityData['records'] = activity?.records?.toString();

    addActivity(customActivityData);

    //console.log(customActivityData);
  }, [activity]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  );
};

export default Upload;
