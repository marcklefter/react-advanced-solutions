import {
  // useState,
  useReducer
} from 'react';

// ...
// Reimplementation of React's useState hook, with useReducer.
function useState(initialValue) {
  return useReducer(
    (state, dispatchedWith) => typeof dispatchedWith === 'function'
      ? dispatchedWith(state)
     : dispatchedWith,
    initialValue
  );
}

export function App() {
  const [count, setCount] = useState(0);

  const inc = () => setCount(count + 1);
  // const inc = () => setCount(prevCount => prevCount + 1);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={inc}>Increment</button>
    </>
  )
}