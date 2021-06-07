import { useState, useEffect, useReducer } from 'react';

// this example solves the problems in useReducer_1, by managing multiple state variables (that also change together)
// with useReducer.
function Counter() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE':
          return {
            count: state.count + state.incBy,
            incBy: state.incBy
          };

        case 'CHANGE':
          return {
            count: state.count,
            incBy: action.incBy
          };

        default:
          return state;
      }
    },
    {
      count: 0,
      incBy: 1
    }
  );

  // note: This effect doesn't capture any state variables at all.
  useEffect(() => {
    const handle = setInterval(() => {
      dispatch({
        type: 'UPDATE'
      })
    }, 1000);

    return () => clearInterval(handle);
  }, [dispatch]);
  // dispatch remains the same across renders.

  return (
    <>
      <p>Count: {state.count}</p>
      <input
        type="number"
        value={state.incBy}
        onChange={e => dispatch({
          type: 'CHANGE',
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