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
