// ES6
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import React from 'react';

// const Map = ReactMapboxGl({
//   accessToken: 'pk.eyJ1Ijoiam1pa3J1dDA4IiwiYSI6ImNrYTdnN3A4djAzZGUycXBtNHhpN25wN2oifQ.37cxxJ1_4PvsX71YbaTv3Q',
// });

const MapContainer = () => {
  const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1Ijoiam1pa3J1dDA4IiwiYSI6ImNrYTdnN3A4djAzZGUycXBtNHhpN25wN2oifQ.37cxxJ1_4PvsX71YbaTv3Q',
  });
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-122.48369693756104, 37.83381888486939],
            [-122.48348236083984, 37.83317489144141],
            [-122.48339653015138, 37.83270036637107],
            [-122.48356819152832, 37.832056363179625],
            [-122.48404026031496, 37.83114119107971],
            [-122.48404026031496, 37.83049717427869],
            [-122.48348236083984, 37.829920943955045],
            [-122.48356819152832, 37.82954808664175],
            [-122.48507022857666, 37.82944639795659],
            [-122.48610019683838, 37.82880236636284],
            [-122.48695850372314, 37.82931081282506],
            [-122.48700141906738, 37.83080223556934],
            [-122.48751640319824, 37.83168351665737],
            [-122.48803138732912, 37.832158048267786],
            [-122.48888969421387, 37.83297152392784],
            [-122.48987674713133, 37.83263257682617],
            [-122.49043464660643, 37.832937629287755],
            [-122.49125003814696, 37.832429207817725],
            [-122.49163627624512, 37.832564787218985],
            [-122.49223709106445, 37.83337825839438],
            [-122.49378204345702, 37.83368330777276],
          ],
        },
      },
    ],
  };
  const linePaint = {
    'line-color': 'red',
    'line-width': 3,
  };
  return (
    <Map
      //style="mapbox://styles/jmikrut08/cka7gql881ifp1ilovnwjm5d4"
      style="mapbox://styles/jmikrut08/ckabcy0010o7v1ip66qfgqnte"
      center={[-122.49378204345702, 37.83368330777276]}
      //center={[-77.01239, 38.91275]}
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <GeoJSONLayer data={geojson} linePaint={linePaint} />
      {
        //     <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        //     <Feature coordinates={[-122.49378204345702, 37.83368330777276]} />
        //   </Layer>
      }
    </Map>
  );
};

export default MapContainer;
