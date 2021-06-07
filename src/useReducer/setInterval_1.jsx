import { useState, useEffect } from 'react';

// this example demonstrates a problem that may occur when using a state variable as a dependency to useEffect.
function Counter() {
  const [count, setCount] = useState(0);

  // this effect runs only once, to setup a timer. It also returns a cleanup function that is run if the component
  // is unmounted (removed from the DOM) or if any dependency changes. 
  //
  // The problem is that the timer only updates once; this is because the useEffect callback captures the
  // value of count = 0 when it's created, which happens the first time the component is rendered. This results
  // in setCount(0 + 1) every time the timer updates, and since the new value to setCount is the same, React doesn't 
  // trigger a re-render.
  // 
  // Since the effect is actually dependent on count, one might add it to the dependency array. This will make 
  // the timer work, but it also results in the timer being created/destroyed every 1s. 
  useEffect(() => {
    const handle = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(handle);
  }, []);
  // [count] would work here, but the timer is then created/destroyed every 1s. 
  // 
  // Why? Since the count variable is a dependency and its value changes upon every render, the useEffect 
  // will run again to create a new timer but calls the cleanup function first to destroy the previous timer.

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