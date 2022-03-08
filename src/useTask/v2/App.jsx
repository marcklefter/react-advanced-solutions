import {
  useEffect,
  useState,
  useMemo
} from 'react';

import _ from 'lodash';

import {
  fetchResource,

  // use this function if implementing optional request cancellation exercise.
  // fetchResourceCancellable
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
// Alternative to memoization with useMemo, by lifting the debounced function outside the component.
//
// Comment out the memoized debounce_setUserResource in the App component; invoke this version in the handleChange event handler as follows:
//
// debounced_setUserResource(run, getUserResource(userId));

// const debounced_setUserResource = _.debounce(
//   (run, userResource) => {
//     console.log('Extracted debounced_setUserResource')
//     run(fetchResource(userResource, 1000));
//   },
//   500
// );

const getUserResource = userId => `users/${userId}`;

// ...

export function App() {
  const [
    userId, 
    setUserId
  ] = useState(1);
  
  const [
    userResource, 
    setUserResource
  ] = useState(getUserResource(userId));

  const {
    status,
    result: user,
    error,
    run,
    cancel
  } = useTask();

  useEffect(() => {
    run(fetchResource(userResource, 1000));
  }, [userResource]);

  const debounced_setUserResource = useMemo(
    () => _.debounce(userResource => setUserResource(userResource), 500), 
    []
  );
  
  const handleChange = e => {
    const userId = +e.target.value;

    setUserId(userId);

    debounced_setUserResource(getUserResource(userId));
  };

  return (
    <>
      <div style={inputStyle}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
        />
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