import React from 'react';
import './App.css';
import response from './data-1000.json';
import _ from 'lodash';
import { compose, withState, withHandlers, onlyUpdateForKeys, pure } from 'recompose';

const Cell = ({ output }) => {
  return (
    <td>
      {output}
    </td>
  );
};

const Row = ({ row, cols }) => {
  return (
    <tr>
      {cols.map(col => <Cell key={`${row.id}-${col}`} output={_.get(row, col)} />)}
    </tr>
  );
};

const Table = ({ data, cols, sortBy, sortedData, doSort, toggleSortOrder, resetSort }) =>
  <table>
    {sortBy
      ? <thead>
          <tr>
            <th>
              <button onClick={resetSort}>Reset Sort</button>
            </th>
          </tr>
        </thead>
      : null}
    <thead>
      <tr>
        {cols.map(col =>
          <th
            key={col}
            onClick={() => {
              doSort(col);
            }}
          >
            {col}
          </th>,
        )}
      </tr>
    </thead>
    <tbody>
      {(sortedData.length ? sortedData : data).map(row => <Row key={row.id} row={row} cols={cols} />)}
    </tbody>
  </table>;

const withSorting = compose(
  withState('sortBy', 'updateSort', ''),
  withState('sortOrder', 'updateSortOrder', ''),
  withState('sortedData', 'updateSortData', []),
  withHandlers({
    doSort: ({ data, sortOrder, updateSort, updateSortOrder, updateSortData }) => col => {
      updateSort(col);
      updateSortOrder(sortOrder === '' || sortOrder === 'desc' ? 'asc' : 'desc');
      updateSortData(_.orderBy(data, col, sortOrder));
    },
    resetSort: ({ updateSort, updateSortOrder, updateSortData }) => event => {
      updateSort('');
      updateSortOrder('');
      updateSortData([]);
    },
  }),
);

const enhance = compose(
  withSorting,
  // onlyUpdateForKeys(['sortBy', 'sortedData', 'sortOrder'])
);

const TableWithSorting = enhance(Table);

const cols = ['name', 'address.city', 'address.country', 'company', 'return_date', 'return_amount'];

const App = () =>
  <div>
    <h1>Table w/ React + Recompose</h1>
    <TableWithSorting data={response.data} cols={cols} />
  </div>;

export default App;
