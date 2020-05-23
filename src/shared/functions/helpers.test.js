import { setupMapGeoJSONData } from './helpers';

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
