import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRecompose from './AppRecompose';
import AppReactComponent from './AppReactComponent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppReactComponent />, document.getElementById('root'));
registerServiceWorker();
