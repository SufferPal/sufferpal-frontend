// ES6
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import React, { useEffect, useState } from 'react';
import { setupMapGeoJSONData } from '../../shared/functions/helpers';
import { container } from 'aws-amplify';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam1pa3J1dDA4IiwiYSI6ImNrYTdnN3A4djAzZGUycXBtNHhpN25wN2oifQ.37cxxJ1_4PvsX71YbaTv3Q',
});

const MapContainer = ({ rawMeasurements = [] }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [coordinateCount, setCoordinateCount] = useState(0);

  const linePaint = {
    'line-color': 'red',
    'line-width': 3,
  };

  useEffect(() => {
    console.log('raw', rawMeasurements);
    //console.log(coordinates.length);
    const rawMeasurementCoordinates = setupMapGeoJSONData(rawMeasurements);
    console.log('RMC', rawMeasurementCoordinates);
    setCoordinates(rawMeasurementCoordinates);
    console.log('coordinates', coordinates);
    setCoordinateCount(rawMeasurementCoordinates.length);
  }, [rawMeasurements]);

  return (
    <>
      {
        <Map
          style="mapbox://styles/jmikrut08/ckabcy0010o7v1ip66qfgqnte"
          center={[-87.81415463425219, 41.89763618633151]}
          containerStyle={{
            height: '50vh',
            width: '50vw',
          }}
        >
          <GeoJSONLayer
            buffer={512}
            data={{
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: coordinates,
                  },
                },
              ],
            }}
            linePaint={linePaint}
          />

          {
            //     <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            //     <Feature coordinates={[-122.49378204345702, 37.83368330777276]} />
            //   </Layer>
          }
        </Map>
      }

      {coordinates}
    </>
  );
};

export default MapContainer;
