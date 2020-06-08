import {
  setupMapGeoJSONData,
  calculatePace,
  createCustomTimeString,
  getSplitNumberArray,
  setMapCenterCoordinates,
  mileSplits,
} from './helpers';

describe('test setupMapGeoJSONData', () => {
  it('should return array of arrays representating plotted coordinates', () => {
    expect(setupMapGeoJSONData([])).toEqual([]);
    expect(
      setupMapGeoJSONData([
        { altitude: null, distance: null, position_lat: 122.73, position_long: 87.98 },
        { altitude: null, distance: null, position_lat: 123.56, position_long: 89.98 },
      ])
    ).toEqual([
      [87.98, 122.73],
      [89.98, 123.56],
    ]);
    expect(
      setupMapGeoJSONData([
        {
          altitude: 0.19360000000000002,
          cadence: 84,
          distance: 0.00198,
          elapsed_time: 1,
          fractional_cadence: 0.171875,
          heart_rate: null,
          position_lat: 41.89763618633151,
          position_long: -87.81415463425219,
          speed: 13.1616,
          temperature: null,
          timer_time: 1,
          timestamp: '2019-05-04T18:46:28.000Z',
        },
        {
          altitude: 0.4,
          cadence: 70,
          distance: 0.00198,
          elapsed_time: 2,
          fractional_cadence: 0.171875,
          heart_rate: null,
          position_lat: 41.8976369,
          position_long: -87.814155,
          speed: 13.1616,
          temperature: null,
          timer_time: 1,
          timestamp: '2019-05-04T18:46:28.000Z',
        },
      ])
    ).toEqual([
      [-87.81415463425219, 41.89763618633151],
      [-87.814155, 41.8976369],
    ]);
    expect(
      setupMapGeoJSONData([
        {
          altitude: 0.19360000000000002,
          cadence: 84,
          distance: 0.00198,
          elapsed_time: 1,
          fractional_cadence: 0.171875,
          heart_rate: null,
          speed: 13.1616,
          temperature: null,
          timer_time: 1,
          timestamp: '2019-05-04T18:46:28.000Z',
        },
        {
          altitude: 0.4,
          cadence: 70,
          distance: 0.00198,
          elapsed_time: 2,
          fractional_cadence: 0.171875,
          heart_rate: null,
          position_lat: 41.8976369,
          position_long: -87.814155,
          speed: 13.1616,
          temperature: null,
          timer_time: 1,
          timestamp: '2019-05-04T18:46:28.000Z',
        },
      ])
    ).toEqual([[-87.814155, 41.8976369]]);
  });
});

describe('test calculatePace', () => {
  it('should return a string representing pace', () => {
    expect(calculatePace(null, 1000)).toEqual(null);
    expect(calculatePace(null, null)).toEqual(null);
    expect(calculatePace(3600, 6)).toEqual('10:00');
    expect(calculatePace(1800, 6)).toEqual('5:00');
  });
});

describe('test createCustomTimeString', () => {
  it('should return time in HH:MM:SS', () => {
    expect(createCustomTimeString(null)).toEqual(null);
    expect(createCustomTimeString(500)).toEqual('00:08:20');
    expect(createCustomTimeString(120)).toEqual('00:02:00');
    expect(createCustomTimeString(6378.89)).toEqual('01:46:18');
    expect(createCustomTimeString(50000)).toEqual('13:53:20');
  });
});

describe('test getSplitNumberArray', () => {
  it('should return an array of two numbers representing both sides of the decimal', () => {
    expect(getSplitNumberArray(1.233)).toEqual([1, 0.233]);
    expect(getSplitNumberArray(0.899)).toEqual([0, 0.899]);
  });
});

describe('test setMapCenterCoordinates', () => {
  it('should return an array with the center coordinates', () => {
    expect(
      setMapCenterCoordinates([
        [2, 2],
        [2, 4],
      ])
    ).toEqual([2, 3]);
    expect(
      setMapCenterCoordinates([
        [1, 5],
        [1, 3],
      ])
    ).toEqual([1, 4]);
  });
});

describe('test mileSplit', () => {
  it('should return a data in split mile', () => {
    expect(
      mileSplits([
        {
          cadence: 84,
          distance: 0,
          elapsed_time: 1,
          heart_rate: 120,
          speed: 10,
        },
        {
          cadence: 85,
          distance: 0.5,
          elapsed_time: 2,
          heart_rate: 130,
          speed: 11,
        },
        {
          cadence: 86,
          distance: 1,
          elapsed_time: 3,
          heart_rate: 140,
          speed: 12,
        },
        {
          cadence: 87,
          distance: 1.5,
          elapsed_time: 4,
          heart_rate: 155,
          speed: 13,
        },
        {
          cadence: 85,
          distance: 2,
          elapsed_time: 5,
          heart_rate: 160,
          speed: 14,
        },
        {
          cadence: 84,
          distance: 2.5,
          elapsed_time: 6,
          heart_rate: 130,
          speed: 15,
        },
        {
          cadence: 80,
          distance: 3,
          elapsed_time: 7,
          heart_rate: 120,
          speed: 10,
        },
      ])
    ).toEqual([
      {
        id: 2,
        mile: 1,
        mileTime: 3,
        avgSpeed: 11.5,
        avgHR: 135,
        avgCadence: 171,
      },
      {
        id: 4,
        mile: 2,
        mileTime: 2,
        avgSpeed: 13.5,
        avgHR: 157.5,
        avgCadence: 172,
      },
      {
        id: 6,
        mile: 3,
        mileTime: 2,
        avgSpeed: 12.5,
        avgHR: 125,
        avgCadence: 164,
      },
    ]);
  });
});
