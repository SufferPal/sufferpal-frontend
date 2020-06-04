import React from 'react';
import '../../styles/GraphStyles/GraphStyles.scss';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

//import { useLocation } from 'react-router-dom';

const CadenceGraph = (activity) => {
  //console.log('speedData record', activity);
  console.log('Cadence', activity.activity);
  console.log('Cadence', activity.activity[1]);

  const data = activity.activity;

  return (
    <div>
      <XYPlot height={300} width={700}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title="distance" />
        <YAxis title="cadence" />
        <LineSeries getNull={(d) => d.y !== null} data={data} color="29C865" strokeWidth="1px" />
      </XYPlot>
    </div>
  );
};

export default CadenceGraph;
