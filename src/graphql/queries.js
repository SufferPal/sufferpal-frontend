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
          rawMeasurements {
            timestamp
            timer_time
            position_lat
            position_long
            distance
            heart_rate
            speed
            temperature
            altitude
            cadence
            elapsed_time
            fractional_cadence
          }
          description
        }
        nextToken
      }
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
            rawMeasurements {
              timestamp
              timer_time
              position_lat
              position_long
              distance
              heart_rate
              speed
              temperature
              altitude
              cadence
              elapsed_time
              fractional_cadence
            }
            description
          }
          nextToken
        }
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
      rawMeasurements {
        timestamp
        timer_time
        position_lat
        position_long
        distance
        heart_rate
        speed
        temperature
        altitude
        cadence
        elapsed_time
        fractional_cadence
      }
      description
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
        rawMeasurements {
          timestamp
          timer_time
          position_lat
          position_long
          distance
          heart_rate
          speed
          temperature
          altitude
          cadence
          elapsed_time
          fractional_cadence
        }
        description
      }
      nextToken
    }
  }
`;
