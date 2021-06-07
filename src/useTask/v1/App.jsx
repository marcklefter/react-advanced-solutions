import {
  useState
} from 'react';

import {
  fetchUser
} from '../shared/util';

import {
  useTask
} from '../shared/useTask';

// ...

const baseStyle = {
  textAlign: 'center'
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20
};

// ...

export function App() {
  const [userId, setUserId] = useState(1);

  const {
    status,
    result: user,
    error,
    run,
    cancel
  } = useTask();

  // alternative: Run a task using useEffect:
  //
  // useEffect(() => {
  //   run(fetchUser(userId));
  // }, [run, userId]);

  const handleSubmit = e => {
    e.preventDefault();

    // alternative: Only allow one task to execute at any given moment.
    // 
    // if (status !== 'pending') {
    //  run(fetchUser(userId));
    // }
    
    // comment out this statement if using the useEffect alternative above to run a task.
    run(fetchUser(userId));
  };

  const handleCancel = () => {
    cancel();
  };

  const handleChange = e => {
    setUserId(+e.target.value);
  };

  return (
    <>
      <div style={inputStyle}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Fetch User</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>

      <div style={baseStyle}>
        {status === 'pending' && 'Loading...'}
        {status === 'rejected' && `${error}`}
        {status === 'resolved' && (
          <p>Name: {user.name}</p>
        )}
      </div>
    </>
  )
}