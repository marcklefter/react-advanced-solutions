import { useState, useEffect } from 'react';

// this example demonstrates a problem that may occur when managing multiple state variables (that also change
// together) in conjunction with useEffect.
function Counter() {
  const [count, setCount] = useState(0);  // the current count.
  const [incBy, setIncBy] = useState(1);  // how much to increment count with.

  useEffect(() => {
    const handle = setInterval(() => {
      // calculation of new count is slightly more complicated, as it depends on another state variable (incBy).
      setCount(prevCount => prevCount + incBy);
    }, 1000);

    return () => clearInterval(handle);
  }, [incBy]);
  // Problem 1: [incBy] creates a new timer every time incBy changes.
  // Problem 2: [] will not reflect any changes to incBy => the counter will continue to increment by 1.

  return (
    <>
      <p>Count: {count}</p>
      <input
        type="number"
        value={incBy}
        onChange={e => setIncBy(+e.target.value)}
      />
    </>
  );
}

export function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(true)}>Show Counter</button>
      <button onClick={() => setShow(false)}>Hide Counter</button>
      {show && <Counter />}
    </>
  )
}