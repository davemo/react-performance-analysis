import React from 'react';
import './App.css';
import response from './data.json';
import _ from 'lodash';
import { compose, withState, withHandlers } from 'recompose';

const withSorting = compose(
  withState('sortBy', 'updateSort', ''),
  withState('sortOrder', 'updateSortOrder', ''),
  withHandlers({
    toggleSortOrder: ({ sortOrder, updateSortOrder }) => event => {
      updateSortOrder(sortOrder === '' || sortOrder === 'DESC' ? 'ASC' : 'DESC');
    },
    resetSort: ({ updateSort, updateSortOrder }) => event => {
      updateSort('')
      updateSortOrder('')
    },
  }),
);

const Table = ({ data, cols, sortBy, updateSort, toggleSortOrder, resetSort }) =>
  <table>
    {sortBy &&
      <thead>
        <tr>
          <th>
            <button onClick={resetSort}>Reset Sort</button>
          </th>
        </tr>
      </thead>}
    <thead>
      <tr>
        {cols.map(col =>
          <th
            key={col}
            onClick={() => {
              updateSort(col);
              toggleSortOrder();
            }}
          >
            {col}
          </th>,
        )}
      </tr>
    </thead>
    <tbody>
      {data.map(row =>
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
