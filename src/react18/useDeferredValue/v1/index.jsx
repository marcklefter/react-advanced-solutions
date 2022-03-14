import React, {
  useState
} from 'react';

import Plot from './Plot';

// ...

const styles = {
  margin: 'auto',
  width: '80%'
};

// ...

export function App() {
  const [text, setText] = useState('');

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
      <Plot input={text} />
    </div>
  )
}