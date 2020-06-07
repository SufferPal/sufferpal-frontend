import React from 'react';
import { Table } from 'reactstrap';
import { mileSplits, calculatePace } from '../../shared/functions/helpers';
import '../../components/MileSplitsTable/MileSplitsTable.scss';
import SplitsGraph from '../SplitsGraph/SplitsGraph';

const MileSplitsTable = ({ SplitData }) => {
  const splits = mileSplits(SplitData);

  return (
    <div className="table-div">
      <Table className="table">
        <thead>
          <tr className="header">
            <th>Mile</th>
            <th>Pace (min/mile)</th>
            <th>Heart Rate (bpm)</th>
            <th>Cadence (rpm)</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-data">
          {splits?.map((split, index) => {
            return (
              <tr key={index}>
                <td>Mile {split.mile}</td>
                <td>{calculatePace(split.mileTime, 1)}</td>
                <td>{split.avgHR.toFixed(0)}</td>
                <td>{split.avgCadence.toFixed(0)}</td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <SplitsGraph SplitData={splits} />
    </div>
  );
};

export default MileSplitsTable;
