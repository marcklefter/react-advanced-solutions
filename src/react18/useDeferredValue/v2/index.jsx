import React, {
  useDeferredValue,
  useEffect,
  useState
} from 'react';

import Plot from './Plot';

// ...

const styles = {
  margin: 'auto',
  width: '80%'
};

// ...
// Custom useDeferredValue hook, implemented with React.startTransition.
const useDeferredValueCustom = newValue => {
  const [value, setValue] = useState(newValue);
  
  useEffect(() => {
    // begin background rendering for the newValue.
    React.startTransition(() => {
      setValue(newValue);
    });
  }, [newValue]);
  
  return value;
}


export function App() {
  const [text, setText] = useState('');

  // as the user enters text, the useDeferredValue hook will return a version of it that "lags behind" for at most
  // 2000 ms. This allows this component to immediately show the newly entered text without waiting for the Plot 
  // component to also render (and thus possibly block further user input).
  //
  // The Plot component will instead render with the (deferred) text in the background and thus not block the user
  // from entering text.
  //
  // Note: React will always try to use a shorter lag if possible.
  const deferredText = useDeferredValue(text, {
    timeoutMs: 2000
  });

  const handleChange = e => {
    const value = e.target.value;

    setText(value);
};

  return (
    <div style={styles}>
      <input
        value={text}
        style={{ display: 'block', margin: 'auto' }}
        size={50}
        onChange={handleChange}
      />
      <Plot input={deferredText} />
    </div>
  )
}