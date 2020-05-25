// ES6
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import React, { useEffect, useState } from 'react';
import { setupMapGeoJSONData } from '../../shared/functions/helpers';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam1pa3J1dDA4IiwiYSI6ImNrYTdnN3A4djAzZGUycXBtNHhpN25wN2oifQ.37cxxJ1_4PvsX71YbaTv3Q',
});

const MapContainer = ({ rawMeasurements = [] }) => {
  const [coordinates, setCoordinates] = useState([]);

  const linePaint = {
    'line-color': 'red',
    'line-width': 3,
  };

  useEffect(() => {
    console.log(rawMeasurements);
    const rawMeasurementCoordinates = setupMapGeoJSONData(rawMeasurements);
    setCoordinates(rawMeasurementCoordinates);
  }, [rawMeasurements]);

  return (
    <>
      {
        <Map
          // eslint-disable-next-line react/style-prop-object
          style="mapbox://styles/jmikrut08/ckabcy0010o7v1ip66qfgqnte"
          center={[-87.81415463425219, 41.89763618633151]}
          containerStyle={{
            height: '300px',
            width: '400px',
          }}
        >
          <GeoJSONLayer
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
        </Map>
      }
    </>
  );
};

export default MapContainer;
