import {
  Followers,
  Repos,
} from './components';

import {
  BASE_URL
} from './constants';

import {
  useFetch,
  useImageFetch
} from './useFetch';

// ...

export const UserProfile = ({ user }) => {
  const {
    data: details
  } = useFetch(`${BASE_URL}/${user}`)

  const loaded = useImageFetch(details?.avatar_url);

  if (!details || !loaded) {
    return <p>Loading {user}...</p>
  }

  return (
    <>
      <div className="row" style={{ flexDirection: 'column' }}>
        <div>
          <img className="image" src={details.avatar_url} alt="" />
        </div>
        <h1>{details.name}</h1>
      </div>
      <div className="row">
        <div className="column">
          <Repos endpoint={`${BASE_URL}/${user}/repos`} />
        </div>
        <div className="column">
          <Followers endpoint={`${BASE_URL}/${user}/followers`} />
        </div>
      </div>
    </>
  )
}