/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      gender
      age
      profilePictureS3FileKey
      weight
      maxHeartRate
      friends
      bestTime10K
      bestTime5K
      bestTime1K
      bestTime1Mile
      activities {
        items {
          id
          userID
          totalCalories
          startTime
          totalMovingTime
          maxCadence
          minHeartRate
          avgSpeed
          maxHeartRate
          totalDistance
          avgCadence
          avgHeartRate
          sport
          rawMeasurementsS3FileKey
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      gear {
        items {
          id
          userID
          brand
          model
          datePurchased
          isEquipped
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      gender
      age
      profilePictureS3FileKey
      weight
      maxHeartRate
      friends
      bestTime10K
      bestTime5K
      bestTime1K
      bestTime1Mile
      activities {
        items {
          id
          userID
          totalCalories
          startTime
          totalMovingTime
          maxCadence
          minHeartRate
          avgSpeed
          maxHeartRate
          totalDistance
          avgCadence
          avgHeartRate
          sport
          rawMeasurementsS3FileKey
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      gear {
        items {
          id
          userID
          brand
          model
          datePurchased
          isEquipped
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      gender
      age
      profilePictureS3FileKey
      weight
      maxHeartRate
      friends
      bestTime10K
      bestTime5K
      bestTime1K
      bestTime1Mile
      activities {
        items {
          id
          userID
          totalCalories
          startTime
          totalMovingTime
          maxCadence
          minHeartRate
          avgSpeed
          maxHeartRate
          totalDistance
          avgCadence
          avgHeartRate
          sport
          rawMeasurementsS3FileKey
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      gear {
        items {
          id
          userID
          brand
          model
          datePurchased
          isEquipped
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createActivity = /* GraphQL */ `
  mutation CreateActivity($input: CreateActivityInput!, $condition: ModelActivityConditionInput) {
    createActivity(input: $input, condition: $condition) {
      id
      userID
      totalCalories
      startTime
      totalMovingTime
      maxCadence
      minHeartRate
      avgSpeed
      maxHeartRate
      totalDistance
      avgCadence
      avgHeartRate
      sport
      rawMeasurementsS3FileKey
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity($input: UpdateActivityInput!, $condition: ModelActivityConditionInput) {
    updateActivity(input: $input, condition: $condition) {
      id
      userID
      totalCalories
      startTime
      totalMovingTime
      maxCadence
      minHeartRate
      avgSpeed
      maxHeartRate
      totalDistance
      avgCadence
      avgHeartRate
      sport
      rawMeasurementsS3FileKey
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity($input: DeleteActivityInput!, $condition: ModelActivityConditionInput) {
    deleteActivity(input: $input, condition: $condition) {
      id
      userID
      totalCalories
      startTime
      totalMovingTime
      maxCadence
      minHeartRate
      avgSpeed
      maxHeartRate
      totalDistance
      avgCadence
      avgHeartRate
      sport
      rawMeasurementsS3FileKey
      description
      createdAt
      updatedAt
    }
  }
`;
export const createGear = /* GraphQL */ `
  mutation CreateGear($input: CreateGearInput!, $condition: ModelGearConditionInput) {
    createGear(input: $input, condition: $condition) {
      id
      userID
      brand
      model
      datePurchased
      isEquipped
      distance
      createdAt
      updatedAt
    }
  }
`;
export const updateGear = /* GraphQL */ `
  mutation UpdateGear($input: UpdateGearInput!, $condition: ModelGearConditionInput) {
    updateGear(input: $input, condition: $condition) {
      id
      userID
      brand
      model
      datePurchased
      isEquipped
      distance
      createdAt
      updatedAt
    }
  }
`;
export const deleteGear = /* GraphQL */ `
  mutation DeleteGear($input: DeleteGearInput!, $condition: ModelGearConditionInput) {
    deleteGear(input: $input, condition: $condition) {
      id
      userID
      brand
      model
      datePurchased
      isEquipped
      distance
      createdAt
      updatedAt
    }
  }
`;
