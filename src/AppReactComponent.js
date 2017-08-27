import React, { Component } from 'react';
import './App.css';
import response from './data-1000.json';
import _ from 'lodash';
import { pure } from 'recompose';

const Cell = pure(({ output }) => {
  return (
    <td>{output}</td>
  )
})

const Row = pure(({ row, cols }) => {
  return (
    <tr>
      {cols.map(col =>
        <Cell key={`${row.id}-${col}`} output={_.get(row, col)} />
      )}
    </tr>
  )
})

class Table extends Component {
  state = {
    sortBy: '',
    sortOrder: '',
    sortedData: [],
  }

  doSort = (col, sortOrder) => () => {
    const newSortOrder =
      (this.state.sortOrder === '' || this.state.sortOrder === 'desc')
      ? 'asc'
      : 'desc';

    this.setState({
      sortBy: col,
      sortOrder: newSortOrder,
      sortedData: _.orderBy(this.props.data, col, newSortOrder)
    });
  }

  resetSort = () => {
    this.setState({
      sortBy: '',
      sortOrder: '',
      sortedData: [],
    });
  }

  render() {
    const { data, cols } = this.props;
    const { sortBy, sortOrder, sortedData } = this.state;

    return (
      <table>
        {
          sortBy
          ? <thead>
              <tr>
                <th>
                  <button onClick={this.resetSort}>Reset Sort</button>
                </th>
              </tr>
            </thead>
          : null
        }
        <thead>
          <tr>
            {cols.map(col =>
              <th key={col} onClick={this.doSort(col, sortOrder)}>
                {col}
              </th>,
            )}
          </tr>
        </thead>
        <tbody>
          {(sortedData.length ? sortedData : data).map(row =>
            <Row key={row.id} row={row} cols={cols} />
          )}
        </tbody>
      </table>
    );
  }
};

const cols = ['name', 'address.city', 'address.country', 'company', 'return_date', 'return_amount'];

const App = () =>
  <div>
    <h1>Table w/ React Component</h1>
    <Table data={response.data} cols={cols} />
  </div>;

export default App;
