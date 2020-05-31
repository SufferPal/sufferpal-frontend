import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import { updateUser } from '../../graphql/mutations';
import Storage from '@aws-amplify/storage';

const SettingsForm = (props) => {
  const userID = useSelector((state) => state.user.id);
  const [userData, setUserData] = useState({});
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [weight, setWeight] = useState(0);
  const [profilePic, setProfilePic] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: '6c57fb6a-3ec6-4c67-a205-8323952c8293',
              weight: weight,
              firstName: firstName,
              lastName: lastName,
            },
          })
        );
        const userDataFromCall = await API.graphql(graphqlOperation(getUser, { id: userID }));
        console.log(userDataFromCall);
        setUserData(userDataFromCall.data.getUser);
        setUpdatedUserData(userDataFromCall.data.getUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

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
    setWeight(value);
  };

  const profilePicutureHandlerOnChange = (event) => {
    const value = event.target.files[0];
    setProfilePic(value);
  };

  const checkUpdates = () => {
    try {
      if (firstName != '') {
        const updateFirstName = async () => {
          await API.graphql(
            graphqlOperation(updateUser, {
              input: { id: '6c57fb6a-3ec6-4c67-a205-8323952c8293', firstName: firstName },
            })
          );
        };
        updateFirstName();
      }
      if (lastName != '') {
        const updateLastName = async () => {
          await API.graphql(
            graphqlOperation(updateUser, { input: { id: '6c57fb6a-3ec6-4c67-a205-8323952c8293', lastName: lastName } })
          );
        };
        updateLastName();
      }
      if (weight != 0) {
        const updateWeight = async () => {
          await API.graphql(
            graphqlOperation(updateUser, { input: { id: '6c57fb6a-3ec6-4c67-a205-8323952c8293', weight: weight } })
          );
        };
        updateWeight();
      }
      const blob = new Blob([profilePic], { type: 'image/jpg' });
      const profilePictureName = `profilePictures/${userID}/pic_${Date.now()}`;
      Storage.put(profilePictureName, blob);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" onChange={profilePicutureHandlerOnChange} />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a
          new line.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="FirstName"
          id="firstName"
          placeholder={userData.firstName}
          onChange={handleFirstNameOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="text"
          name="lastName"
          id="lastname"
          placeholder={userData.lastName}
          onChange={handleLastNameOnChange}
        />
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>Gender</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> Male
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> Female
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="weight">Weight</Label>
        <Input type="number" name="number" id="weight" placeholder={userData.weight} onChange={handleWeightOnChange} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleDate">Birth Date</Label>
        <Input type="date" name="birthDate" id="birthDate" placeholder="06/04/1989" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Equip Gear</Label>
        <Input type="select" name="gear" id="gear">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <Button color="primary" onClick={checkUpdates}>
        Do Something
      </Button>{' '}
    </Form>
  );
};

export default SettingsForm;
