import React from 'react';
import '../../styles/GraphStyles/GraphStyles.scss';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

//import { useLocation } from 'react-router-dom';

const HeartRateGraph = (activity) => {
  //console.log('HR record', activity.activity);

  const data = activity.activity;

  return (
    <div>
      <XYPlot height={300} width={700}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title="distance" />
        <YAxis title="heart rate" />
        <LineSeries getNull={(d) => d.y !== null} data={data} color="DC4242" strokeWidth="1px" />
      </XYPlot>
    </div>
  );
};

export default HeartRateGraph;
