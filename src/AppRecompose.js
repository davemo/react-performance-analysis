import React from 'react';
import './App.css';
import response from './data.json';
import _ from 'lodash';
import { compose, withState, withHandlers } from 'recompose';

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
      {(sortedData.length ? sortedData : data).map(row =>
        <tr key={row.id}>
          {cols.map(col =>
            <td key={`${row.id}-${col}`}>
              {_.get(row, col)}
            </td>,
          )}
        </tr>,
      )}
    </tbody>
  </table>;

const TableWithSorting = withSorting(Table);

const cols = ['name', 'address.city', 'address.country', 'company', 'return_date', 'return_amount'];

const App = () =>
  <div>
    <h1>Table w/ React & Recompose</h1>
    <TableWithSorting data={response.data} cols={cols} />
  </div>;

export default App;
