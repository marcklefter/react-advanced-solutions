import {
  useState
} from 'react';

import {
  UserProfile
} from './UserProfile';

import {
  preFetch
} from './useFetch';

import {
  BASE_URL
} from './constants';

import './styles.css';

// ...

const users = [
  'marcklefter',
  'krawaller',
  'masak',
  'toshi38'
];

// ...

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const selectUser = user => {
    preFetch(`${BASE_URL}/${user}/repos`);
    preFetch(`${BASE_URL}/${user}/followers`);

    setCurrentUser(user);
  };

  const onBack = () => {
    setCurrentUser(null);
  };

  return (
    <>
      {currentUser
        ? (
          <>
            <button onClick={onBack}>Back</button>
            <UserProfile user={currentUser} />
          </>
        )
        : users.map(user => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            key={user}
            style={{
              display: 'block',
              cursor: 'pointer'
            }}
            onClick={() => selectUser(user)}
          >
            {user}
          </a>
        ))}
    </>
  )
}