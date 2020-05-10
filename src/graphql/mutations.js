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
    }
  }
`;
export const createActivity = /* GraphQL */ `
  mutation CreateActivity($input: CreateActivityInput!, $condition: ModelActivityConditionInput) {
    createActivity(input: $input, condition: $condition) {
      id
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
    }
  }
`;
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity($input: UpdateActivityInput!, $condition: ModelActivityConditionInput) {
    updateActivity(input: $input, condition: $condition) {
      id
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
    }
  }
`;
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity($input: DeleteActivityInput!, $condition: ModelActivityConditionInput) {
    deleteActivity(input: $input, condition: $condition) {
      id
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
    }
  }
`;
