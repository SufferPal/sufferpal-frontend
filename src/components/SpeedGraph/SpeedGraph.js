import React from 'react';
import '../../styles/GraphStyles/GraphStyles.scss';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

//import { useLocation } from 'react-router-dom';

const SpeedGraph = (activity) => {
  //console.log('speedData record', activity);
  console.log('speedData record', activity.activity);
  console.log('speedData record', activity.activity[1]);

  const data = activity.activity;

  return (
    <div>
      <XYPlot height={300} width={700}>
        <VerticalGridLines color="blue" />
        <HorizontalGridLines />
        <XAxis title="distance" />
        <YAxis title="speed" />
        <LineSeries getNull={(d) => d.y !== null} data={data} color="33E3FF" strokeWidth="1px" />
      </XYPlot>
    </div>
  );
};

export default SpeedGraph;
