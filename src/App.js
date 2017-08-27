import React from 'react';
import './App.css';
import response from './data.json';
import _ from 'lodash';

const Table = ({ data, cols }) =>
  <table>
    <thead>
      <tr>
        {cols.map(col =>
          <th key={col}>
            {col}
          </th>,
        )}
      </tr>
    </thead>
    <tbody>
      {data.map(row =>
        <tr key={row.id}>
          {cols.map((col) =>
            <td key={`${row.id}-${col}`}>
              {_.get(row, col)}
            </td>,
          )}
        </tr>,
      )}
    </tbody>
  </table>;

const cols = [
  'name',
  'address.city',
  'address.country',
  'company',
  'return_date',
  'return_amount'
];

const App = () =>
  <div>
    <h1>Table w/ React & Recompose</h1>
    <Table data={response.data} cols={cols} />
  </div>;

export default App;
