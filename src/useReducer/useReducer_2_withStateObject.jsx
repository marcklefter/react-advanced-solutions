
import { useState, useEffect } from 'react';

// this example demonstrates a problem that may occur when managing multiple state variables (that also change
// together) in conjunction with useEffect.
//
// Alternative solution to using useReducer (see useReducer_2.jsx).
function Counter() {
  const [state, setState] = useState({
    count: 0,
    incBy: 1
  });

  const {
    count,
    incBy
  } = state;

  useEffect(() => {
    const handle = setInterval(() => {
      setState(prevState => ({
        count: prevState.count + prevState.incBy,
        incBy: prevState.incBy
      }));
    }, 1000);

    return () => clearInterval(handle);
  }, []);
  
  return (
    <>
      <p>Count: {count}</p>
      <input
        type="number"
        value={incBy}
        onChange={e => setState({
          count,
          incBy: +e.target.value        
        })}
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