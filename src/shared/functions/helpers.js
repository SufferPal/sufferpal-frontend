// This function converts raw measurments from backend of activity into useable format for map container
export const setupMapGeoJSONData = (rawMeasurements) => {
  if (rawMeasurements.length === 0) {
    return [];
  }

  const geoJSONData = [];
  const length = rawMeasurements.length;

  for (let index = 0; index < length; index++) {
    const rawMeasurement = rawMeasurements[index];
    if (!rawMeasurement['position_long'] || !rawMeasurement['position_lat']) {
      continue;
    }
    // if (geoJSONData.length > 800) {
    //     break;
    // }
    const coordinates = [rawMeasurement['position_long'], rawMeasurement['position_lat']];
    geoJSONData.push(coordinates);
  }
  return geoJSONData;
};
// this function calculates the pace for an activity
export const calculatePace = (time, distance) => {
  // time is coming in as seconds
  if (!time || !distance) {
    return null;
  }

  const timeInMinutes = time / 60;
  const pace = timeInMinutes / distance;
  const paceTwoDecimals = pace.toFixed(2);
  const paceString = paceTwoDecimals.toString();
  const paceSplitMin = paceString.split('.')[0];
  const paceSeconds = '.' + paceString.split('.')[1];
  const paceInSeconds = paceSeconds * 60;
  const seconds = paceInSeconds.toFixed(2).toString();
  const secondsRounded = seconds.split('.')[0];
  //const finalPace = (paceSplitMin + ':' + secondsRounded).toString();
  if (seconds < 10) {
    return (paceSplitMin + ':0' + secondsRounded).toString();
  }

  //const secondsRounded = seconds.split('.')[0];
  const finalPace = (paceSplitMin + ':' + secondsRounded).toString();

  return finalPace;
};

// this function creates custom time on activity card
export const createCustomTimeString = (time) => {
  if (!time) {
    return null;
  }
  const hours = time / 3600;
  const hourSplitArray = getSplitNumberArray(hours);
  const hoursInt = hourSplitArray[0];
  const minutes = hourSplitArray[1] * 60;
  const minutesSplitArray = getSplitNumberArray(minutes);
  const minutesInt = minutesSplitArray[0];
  const seconds = minutesSplitArray[1] * 60;
  const secondsSplitArray = getSplitNumberArray(seconds);
  const secondsInt = secondsSplitArray[0];
  let hoursString = '';
  let minStr = '';
  let secondsString = '';

  if (hoursInt < 10) {
    hoursString = `0${hoursInt}`;
  } else {
    hoursString = hoursInt.toString();
  }
  if (minutesInt < 10) {
    minStr = `0${minutesInt}`;
  } else {
    minStr = minutesInt.toString();
  }
  if (secondsInt < 10) {
    secondsString = `0${secondsInt}`;
  } else {
    secondsString = secondsInt.toString();
  }
  return `${hoursString}:${minStr}:${secondsString}`;
};

export const getSplitNumberArray = (time) => {
  const timeString = time.toString();
  const decimalString = timeString.split('.');
  return [parseInt(decimalString[0]), parseFloat(`0.${decimalString[1]}`)];
};

export const setMapCenterCoordinates = (coordinates) => {
  const length = coordinates.length;
  let sumLat = 0;
  let sumLong = 0;
  for (let i = 0; i < length; i += 1) {
    sumLat += coordinates[i][1];
    sumLong += coordinates[i][0];
  }
  return [sumLong / length, sumLat / length];
};

export const mileSplits = (rawMeasurement) => {
  let mileNumber = 0;
  let startTime = 0;
  let currentTime = 0;
  let currentMileTime = 0;
  let mileIt = 0;
  let recordNumber = 0;
  let totalSpeed = 0;
  let totalHeartRate = 0;
  let totalCadence = 0;
  const splits = [];

  for (let i = 1; i < rawMeasurement.length; i += 1) {
    recordNumber = recordNumber + 1;
    if (rawMeasurement[i].speed !== null && rawMeasurement[i].speed !== undefined) {
      totalSpeed = totalSpeed + rawMeasurement[i].speed;
    }
    if (rawMeasurement[i].heart_rate !== null && rawMeasurement[i].heart_rate !== undefined) {
      totalHeartRate = totalHeartRate + rawMeasurement[i].heart_rate;
    }
    if (rawMeasurement[i].cadence !== null && rawMeasurement[i].cadence !== undefined) {
      totalCadence = totalCadence + rawMeasurement[i].cadence;
    }

    if (rawMeasurement[i].distance >= mileIt + 1) {
      mileIt = mileIt + 1;
      currentTime = rawMeasurement[i].elapsed_time;
      currentMileTime = currentTime - startTime;
      startTime = currentTime;

      mileNumber = mileNumber + 1;
      splits.push({
        id: i,
        mile: mileNumber,
        mileTime: currentMileTime,
        avgSpeed: totalSpeed / recordNumber,
        avgHR: totalHeartRate / recordNumber,
        avgCadence: (totalCadence / recordNumber) * 2,
      });
      recordNumber = 0;
      totalSpeed = 0;
      totalHeartRate = 0;
      totalCadence = 0;
    }
  }
  return splits;
};
