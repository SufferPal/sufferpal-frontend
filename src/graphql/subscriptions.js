/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity {
    onCreateActivity {
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
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity {
    onUpdateActivity {
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
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity {
    onDeleteActivity {
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
export const onCreateGear = /* GraphQL */ `
  subscription OnCreateGear {
    onCreateGear {
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
export const onUpdateGear = /* GraphQL */ `
  subscription OnUpdateGear {
    onUpdateGear {
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
export const onDeleteGear = /* GraphQL */ `
  subscription OnDeleteGear {
    onDeleteGear {
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
