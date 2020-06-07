import React from 'react';
import '../../styles/GraphStyles/GraphStyles.scss';
import { XYPlot, LineSeries, VerticalBarSeries, VerticalBarSeriesCanvas, XAxis, YAxis, BarSeries } from 'react-vis';
import { calculatePace } from '../../shared/functions/helpers';
import '../SplitsGraph/SplitsGraph.scss';

// import { useLocation } from 'react-router-dom';

const SplitsGraph = ({ SplitData }) => {
  let data = [];
  console.log('speedData record', SplitData);

  const dataArray = () => {
    for (let i = 0; i < SplitData.length; i++) {
      data.push({ id: SplitData[i].id, y: SplitData[i].mileTime, x: SplitData[i].mile });
    }
  };

  const myDATA = data;

  dataArray();
  console.log(data);

  const yDomain = myDATA.reduce(
    (res, row) => {
      return {
        max: Math.max(res.max, row.y + 5),
        min: Math.min(res.min - 10, row.y - 10),
      };
    },
    {
      max: -Infinity,
      min: Infinity,
    }
  );

  // const data = activity.activity;

  return (
    <div className="splitsGraph">
      <XYPlot margin={{ left: 75 }} width={750} height={200} yDomain={[yDomain.min, yDomain.max]}>
        <XAxis tickFormat={(v) => `mile ${v}`} />
        <YAxis tickFormat={(v) => calculatePace(v, 1)} />
        <VerticalBarSeries className="vertical-bar-series-example" data={myDATA} />
      </XYPlot>
    </div>
  );
};

export default SplitsGraph;
