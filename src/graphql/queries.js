/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          nextToken
        }
        gear {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
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
export const listActivitys = /* GraphQL */ `
  query ListActivitys($filter: ModelActivityFilterInput, $limit: Int, $nextToken: String) {
    listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getGear = /* GraphQL */ `
  query GetGear($id: ID!) {
    getGear(id: $id) {
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
export const listGears = /* GraphQL */ `
  query ListGears($filter: ModelGearFilterInput, $limit: Int, $nextToken: String) {
    listGears(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
