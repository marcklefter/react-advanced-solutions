import { useState, useEffect, useRef } from 'react';

// this example demonstrates a problem that may occur when managing multiple state variables (that also change
// together) in conjunction with useEffect, and how to solve it with useRef.
function Counter() {
  const [count, setCount] = useState(0);  // the current count.
  
  // track the input element value.
  const inputRef = useRef();

  useEffect(() => {
    const handle = setInterval(() => {
      // utilize the input element's current value in updating the count state.
      setCount(prevCount => prevCount + (+inputRef.current.value));
    }, 1000);

    return () => clearInterval(handle);
  }, []);
  // inputRef remains the same across renders.

  return (
    <>
      <p>Count: {count}</p>
      <input
        ref={inputRef}
        type="number"
        defaultValue={1}
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