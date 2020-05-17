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
