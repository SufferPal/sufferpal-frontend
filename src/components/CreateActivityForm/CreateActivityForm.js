import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { API, graphqlOperation } from 'aws-amplify';
import Storage from '@aws-amplify/storage';
import { createActivity, updateGear } from '../../graphql/mutations';
import { listGears } from '../../graphql/queries';
import FitParser from 'fit-file-parser';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import SufferPalLogo from '../../assets/logo-sufferpal.png';
import './CreateActivityForm.scss';

const CreateActivityForm = () => {
  const [activity, setActivity] = useState({});
  const userID = useSelector((state) => state.user.id);
  const [activityDescription, setActivityDescription] = useState('');
  const [isFitFileDropped, setIsFitFileDropped] = useState(false);
  const [isCreateActivitySuccessful, setIsCreateActivitySuccessful] = useState(false);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] = useState(false);

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
          setIsFitFileDropped(true);
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addActivity = async (activity) => {
    await API.graphql(graphqlOperation(createActivity, { input: activity }));
  };
  const updateGearData = async (gearData) => {
    await API.graphql(graphqlOperation(updateGear, { input: gearData }));
  };
  const listGear = async () => {
    return await API.graphql(graphqlOperation(listGears, { filter: { userID: { eq: userID } } }));
  };

  const handleCreateActivityFormSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    // get list of gear
    // find equipped gear id
    // call update gear with distance from data
    listGear().then((result) => {
      console.log(result);
      const gearArray = result.data.listGears.items;
      let equippedGearID = '';
      let equippedGearDistance = 0;
      for (let i = 0; i < gearArray.length; i += 1) {
        if (gearArray[i].isEquipped) {
          equippedGearID = gearArray[i].id;
          equippedGearDistance = gearArray[i].distance;
        }
      }
      console.log(equippedGearID);
      const newTotalDistance = equippedGearDistance + activity?.sessions[0]?.total_distance;
      const updatedGearData = {
        userID,
        id: equippedGearID,
        distance: newTotalDistance,
      };
      updateGearData(updatedGearData);
    });

    setActivityDescription('');
    setActivity({});
    setIsFitFileDropped(false);

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

        addActivity(customActivityData).then(() => {
          setIsCreateActivitySuccessful(true);
          setIsCreateSuccessAlertOpen(true);
        });
      });
    }
  };

  const handleActivityDescriptionOnChange = (event) => {
    const { value } = event.target;

    setActivityDescription(value);
  };

  const handleSuccessAlertToggle = () => {
    setIsCreateSuccessAlertOpen(false);
  };

  return (
    <div className="CreateActivityForm py-2 px-4 mb-3">
      {isCreateActivitySuccessful && (
        <Alert isOpen={isCreateSuccessAlertOpen} toggle={handleSuccessAlertToggle} color="success">
          Activity Created!
        </Alert>
      )}
      <img className="sufferpal-logo" src={SufferPalLogo} alt="SufferPal Logo" />
      <Form noValidate onSubmit={handleCreateActivityFormSubmit}>
        <div sm="8" className="upload-cont">
          {isFitFileDropped ? (
            <div className="p-2 m-0 mb-1">
              <h4 className="fit-file-dropped-header m-0 mb-2">FIT FILE DROPBOX</h4>
              <p className="fit-file-dropped-text m-0">Fit file dropped!</p>
              <p className="fit-file-dropped-text m-0">Add a description if you would and then hit submit.</p>
            </div>
          ) : (
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
          )}
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

export default CreateActivityForm;
