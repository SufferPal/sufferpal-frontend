import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
// import { getUser } from '../../graphql/queries';
import { updateUser } from '../../graphql/mutations';
import Storage from '@aws-amplify/storage';

const SettingsForm = (props) => {
  const { userData, toggleSettingsModal, fetchUser } = props;
  const userID = useSelector((state) => state.user.id);
  // const [userData, setUserData] = useState({});
  // const [updatedUserData, setUpdatedUserData] = useState({});
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [weight, setWeight] = useState(userData.weight);
  const [profilePic, setProfilePic] = useState(null);
  // const [equippedGear, setEquippedGear] = useState();

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
        firstName,
        lastName,
        weight,
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

  // useEffect(() => {
  //   const { firstName, lastName, weight } = userData;

  //   setFirstName(firstName);
  //   setLastName(lastName);
  //   setWeight(weight);
  // }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       await API.graphql(
  //         graphqlOperation(updateUser, {
  //           input: {
  //             id: '6c57fb6a-3ec6-4c67-a205-8323952c8293',
  //             weight: weight,
  //             firstName: firstName,
  //             lastName: lastName,
  //           },
  //         })
  //       );
  //       const userDataFromCall = await API.graphql(graphqlOperation(getUser, { id: userID }));
  //       console.log(userDataFromCall);
  //       setUserData(userDataFromCall.data.getUser);
  //       // setUpdatedUserData(userDataFromCall.data.getUser);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  const handleFirstNameOnChange = (event) => {
    const { value } = event.target;
    setFirstName(value);
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

  // const checkUpdates = () => {
  //   try {
  //     if (firstName != '') {
  //       const updateFirstName = async () => {
  //         await API.graphql(
  //           graphqlOperation(updateUser, {
  //             input: { id: '6c57fb6a-3ec6-4c67-a205-8323952c8293', firstName: firstName },
  //           })
  //         );
  //       };
  //       updateFirstName();
  //     }
  //     if (lastName != '') {
  //       const updateLastName = async () => {
  //         await API.graphql(
  //           graphqlOperation(updateUser, { input: { id: '6c57fb6a-3ec6-4c67-a205-8323952c8293', lastName: lastName } })
  //         );
  //       };
  //       updateLastName();
  //     }
  //     if (weight != 0) {
  //       const updateWeight = async () => {
  //         await API.graphql(
  //           graphqlOperation(updateUser, { input: { id: '6c57fb6a-3ec6-4c67-a205-8323952c8293', weight: weight } })
  //         );
  //       };
  //       updateWeight();
  //     }
  //     const blob = new Blob([profilePic], { type: 'image/jpg' });
  //     const profilePictureName = `profilePictures/${userID}/pic_${Date.now()}`;
  //     Storage.put(profilePictureName, blob);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      {/* <FormGroup>
        <Label for="exampleSelect">Equip Gear</Label>
        <Input type="select" name="gear" id="gear">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup> */}
      <Button color="primary">Submit</Button>
      <Button color="secondary" onClick={toggleSettingsModal}>
        Cancel
      </Button>
    </Form>
  );
};

export default SettingsForm;
