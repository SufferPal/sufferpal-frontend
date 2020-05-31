import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser, updateGear } from '../../graphql/mutations';
import Storage from '@aws-amplify/storage';

const SettingsForm = (props) => {
  const { userData, toggleSettingsModal, fetchUser } = props;
  const userID = useSelector((state) => state.user.id);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [weight, setWeight] = useState(userData.weight);
  const [profilePic, setProfilePic] = useState(null);
  const [gear, setGear] = useState(userData?.gear?.items);
  const [equippedGearName, setEquippedGearName] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    gear?.forEach((gear) => {
      if (gear.isEquipped) {
        setEquippedGearName(`${gear.brand} ${gear.model}`);
      }
    });
  }, [gear]);

  const updateUserSettings = async (userSettings) => {
    await API.graphql(
      graphqlOperation(updateUser, {
        input: userSettings,
      })
    );
  };

  const updateGearData = async (gear) => {
    await API.graphql(
      graphqlOperation(updateGear, {
        input: gear,
      })
    );
  };

  const handleUserSettingsEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const profilePictureName = `profilePictures/${userID}/pic_${Date.now()}`;
      const updatedUserSettings = {
        id: userID,
        firstName,
        lastName,
        weight,
      };

      if (profilePic) {
        Storage.put(profilePictureName, profilePic).then((result) => {
          updatedUserSettings['profilePictureS3FileKey'] = result.key;
        });
      }

      if (gear) {
        gear.forEach((gear) => {
          const updatedGearData = {
            isEquipped: gear.isEquipped,
            userID: gear.userID,
            id: gear.id,
          };

          updateGearData(updatedGearData);
        });
      }

      updateUserSettings(updatedUserSettings).then(() => {
        fetchUser();
        toggleSettingsModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstNameOnChange = (event) => {
    const { value } = event.target;
    setFirstName(value);
  };

  const handleGearOnChange = (event) => {
    const { value } = event.target;
    setEquippedGearName(value);

    // eslint-disable-next-line no-unused-expressions
    gear?.forEach((gear) => {
      if (`${gear.brand} ${gear.model}` === value) {
        gear.isEquipped = true;
      } else {
        gear.isEquipped = false;
      }
    });
  };

  const handleLastNameOnChange = (event) => {
    const { value } = event.target;
    setLastName(value);
  };

  const handleWeightOnChange = (event) => {
    const { value } = event.target;
    const weight = parseFloat(value);
    console.log(weight);
    setWeight(weight);
  };

  const handleProfilePicutureUpload = (event) => {
    const value = event.target.files[0];
    console.log(value);
    setProfilePic(value);
  };

  return (
    <Form onSubmit={handleUserSettingsEditSubmit}>
      <FormGroup>
        <Label for="profilePicture">Profile Picture</Label>
        <Input type="file" name="Profile Picture" id="profilePicture" onChange={handleProfilePicutureUpload} />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input value={firstName} type="text" name="First Name" id="firstName" onChange={handleFirstNameOnChange} />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input value={lastName} type="text" name="Last Name" id="lastname" onChange={handleLastNameOnChange} />
      </FormGroup>
      <FormGroup>
        <Label for="weight">Weight</Label>
        <Input value={weight} type="number" name="Weight" id="weight" onChange={handleWeightOnChange} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Equip Gear</Label>
        <Input type="select" name="gear" id="gear" value={equippedGearName} onChange={handleGearOnChange}>
          {gear?.map((gear, index) => {
            return (
              <option key={index}>
                {gear.brand} {gear.model}
              </option>
            );
          })}
        </Input>
      </FormGroup>
      <Button color="primary">Submit</Button>
      <Button color="secondary" onClick={toggleSettingsModal}>
        Cancel
      </Button>
    </Form>
  );
};

export default SettingsForm;
