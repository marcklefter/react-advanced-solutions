import {
  useState,
  useTransition,

  Suspense
} from 'react';

import {
  UserProfile
} from './UserProfile';

import {
  Repos
} from './Repos';

import {
  Followers
} from './Followers';

import {
  BASE_URL
} from './constants';

// ...

const users = [
  'marcklefter',
  'krawaller',
  'masak',
  'toshi38'
];

// ...

export const App = () => (
  <Suspense fallback={`Loading view...`}>
    <AppInternal />
  </Suspense>
)

const AppInternal = () => {
  const [
    currentUser,
    setCurrentUser
  ] = useState(null);

  const [
    showProfile,
    setShowProfile
  ] = useState(false);

  const [isPending, startTransition] = useTransition();

  const selectUser = user => {
    setCurrentUser(user);

    // ...
    // If the showProfile state update below is not wrapped in a transition, the outer Suspense boundary will be 
    // triggered and the "Loading view..." fallback shown.
    // setShowProfile(true);

    startTransition(() => {
      setShowProfile(true);
    });
  };

  const goBack = () => {
    setCurrentUser(null);
    setShowProfile(false);
  };

  // ...

  return (
    !showProfile
      ? users.map(user => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key={user}
          style={{
            display: 'block',
            cursor: 'pointer'
          }}
          onClick={() => selectUser(user)}
        >
          {user} {(isPending && currentUser === user) && '...'}
        </a>
      ))
      : (
        <>
          <button onClick={goBack}>Back</button>

          <div className="row" style={{ flexDirection: 'column' }}>
            <div className="column">
              <UserProfile endpoint={`${BASE_URL}/${currentUser}`} />
            </div>
          </div>

          <div className="row">
            <div className="column">
              {/* this suspense boundary allows us to load repos "lazily", i.e. ensuring that rendering the 
                critical UserProfile component is not delayed by the not-as-vital Repos component. */}
              <Suspense fallback={`Loading repos...`}>
                <Repos endpoint={`${BASE_URL}/${currentUser}/repos`} />
              </Suspense>
            </div>

            <div className="column">
              {/* this suspense boundary allows us to load followers "lazily", i.e. ensuring that rendering the 
                critical UserProfile component is not delayed by the not-as-vital Followers component. */}
              <Suspense fallback={`Loading followers...`}>
                <Followers endpoint={`${BASE_URL}/${currentUser}/followers`} />
              </Suspense>
            </div>
          </div>

          {/* To synchronize loading Repos and Followers. */}
          {/* 
            <Suspense fallback={`Loading repos and followers...`}>
              <Repos endpoint={`${BASE_URL}/${currentUser}/repos`} />
              <Followers endpoint={`${BASE_URL}/${currentUser}/followers`} />
            </Suspense> 
          */}
        </>
      )
  )
}