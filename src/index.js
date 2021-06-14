import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';

// ...
// Uncomment an example to run it.
import { App } from './useReducer';
// import { App } from './useStateImpl';
// import { App } from './useTask';
// import { App } from './dependencyContext';
// import { App } from './errorBoundary';
// import { App } from './authContext';
// import { App } from './todo';
// import { App } from './dataFetching';

// ...

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
