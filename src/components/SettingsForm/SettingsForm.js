import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../graphql/mutations';
import Storage from '@aws-amplify/storage';

const SettingsForm = ({ firstName, lastName, weight, fetchUser, toggleSettingsModal }) => {
  const userID = useSelector((state) => state.user.id);
  const [userFirstName, setUserFirstName] = useState(firstName);
  const [userLastName, setUserLastName] = useState(lastName);
  const [userWeight, setUserWeight] = useState(weight);
  const [profilePic, setProfilePic] = useState(null);

  const updateUserSettings = async (userSettings) => {
    await API.graphql(
      graphqlOperation(updateUser, {
        input: userSettings,
      })
    );
  };

  const handleUserSettingsEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const profilePictureName = `profilePictures/${userID}/pic_${Date.now()}`;
      const updatedUserSettings = {
        id: userID,
        firstName: userFirstName,
        lastName: userLastName,
        weight: userWeight,
      };

      if (profilePic) {
        Storage.put(profilePictureName, profilePic).then((result) => {
          updatedUserSettings['profilePictureS3FileKey'] = result.key;
          updateUserSettings(updatedUserSettings).then(() => {
            fetchUser();
            toggleSettingsModal();
          });
        });
      } else {
        updateUserSettings(updatedUserSettings).then(() => {
          fetchUser();
          toggleSettingsModal();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstNameOnChange = (event) => {
    const { value } = event.target;
    setUserFirstName(value);
  };

  const handleLastNameOnChange = (event) => {
    const { value } = event.target;
    setUserLastName(value);
  };

  const handleWeightOnChange = (event) => {
    const { value } = event.target;
    const weight = parseFloat(value);
    setUserWeight(weight);
  };

  const handleProfilePictureUpload = (event) => {
    const value = event.target.files[0];
    setProfilePic(value);
  };

  return (
    <Form onSubmit={handleUserSettingsEditSubmit}>
      <FormGroup>
        <Label for="profilePicture">Profile Picture</Label>
        <Input type="file" name="Profile Picture" id="profilePicture" onChange={handleProfilePictureUpload} />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input value={userFirstName} type="text" name="First Name" id="firstName" onChange={handleFirstNameOnChange} />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input value={userLastName} type="text" name="Last Name" id="lastname" onChange={handleLastNameOnChange} />
      </FormGroup>
      <FormGroup>
        <Label for="weight">Weight</Label>
        <Input value={userWeight} type="number" name="Weight" id="weight" onChange={handleWeightOnChange} />
      </FormGroup>
      <Button color="primary">Submit</Button>
      <Button color="secondary" onClick={toggleSettingsModal}>
        Cancel
      </Button>
    </Form>
  );
};

SettingsForm.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  weight: PropTypes.number,
  toggleSettingsModal: PropTypes.func.isRequired,
};

SettingsForm.defaultProps = {
  firstName: '',
  lastName: '',
  weight: 0,
};

export default SettingsForm;
