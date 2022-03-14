import React from 'react';
import ReactDOM from 'react-dom';

// React 18: Comment out the ReactDOM import above.
// import { createRoot } from 'react-dom/client';

import './index.css';
import reportWebVitals from './reportWebVitals';

// ...
// Uncomment an example to run it.
import { App } from './useReducer';
// import { App } from './useStateImpl';
// import { App } from './useTask';
// import { App } from './useFetch';
// import { App } from './dependencyContext';
// import { App } from './errorBoundary';
// import { App } from './authContext';
// import { App } from './todo';
// import { App } from './dataFetching';

// import { App } from './react18/useDeferredValue';
// import { App } from './react18/suspense';

// ...

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ...
// React 18: Comment out ReactDOM.render() above.
// const root = createRoot(document.getElementById('root'));
// root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
