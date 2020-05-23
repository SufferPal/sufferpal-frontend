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
