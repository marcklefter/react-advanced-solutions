import { useState, useEffect } from 'react';

// this example solves the problem in setInterval_1 by calling setCount with a callback.
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handle = setInterval(() => {
      // use the callback version of setCount; the callback returns a new count based on the previous count 
      // that is passed to it.
      // 
      // See: https://reactjs.org/docs/hooks-reference.html#functional-updates.
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(handle);
  }, []);
  // empty dependency array because the effect does not depend on the count variable any more.
  // The timer is therefore only created once.

  return <p>Count: {count}</p>
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