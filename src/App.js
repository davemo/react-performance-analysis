import React from 'react';
import './App.css';

const Table = ({ data, cols }) => (
  <table>
    <thead>
      {cols.map(c => (
        <tr key={c.header}>
          <th>{c.header}</th>
        </tr>
      ))}
    </thead>
    <tbody>
      {data.map(r => (
        <tr key={r.id}>
        {cols.map((c, i) => (
          <td key={`${r}-${c}${i}`}>{c}</td>
        ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const App = () => (
  <h1>Table w/ React & Recompose</h1>
);

export default App;
