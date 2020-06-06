// ES6
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import React, { useEffect, useState } from 'react';
import { setupMapGeoJSONData, setMapCenterCoordinates } from '../../shared/functions/helpers';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam1pa3J1dDA4IiwiYSI6ImNrYTdnN3A4djAzZGUycXBtNHhpN25wN2oifQ.37cxxJ1_4PvsX71YbaTv3Q',
});

const MapContainer = ({ rawMeasurements = [], mapDimensions }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [centerCoordinates, setCenterCoordinates] = useState([-87.81415463425219, 41.89763618633151]);

  const linePaint = {
    'line-color': 'red',
    'line-width': 3,
  };

  useEffect(() => {
    const rawMeasurementCoordinates = setupMapGeoJSONData(rawMeasurements);
    const centerCoordinates = setMapCenterCoordinates(rawMeasurementCoordinates);
    setCoordinates(rawMeasurementCoordinates);
    setCenterCoordinates(centerCoordinates);
  }, [rawMeasurements]);

  return (
    <>
      {
        <Map
          // eslint-disable-next-line react/style-prop-object
          style="mapbox://styles/jmikrut08/ckabcy0010o7v1ip66qfgqnte"
          zoom={[10]}
          center={centerCoordinates}
          containerStyle={mapDimensions}
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
