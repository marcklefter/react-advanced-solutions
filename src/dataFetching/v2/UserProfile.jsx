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

  const {
    data: repos
  } = useFetch(`${BASE_URL}/${user}/repos`);

  const {
    data: followers
  } = useFetch(`${BASE_URL}/${user}/followers`);

  const loaded = useImageFetch(details?.avatar_url);

  if (!details || !repos || !followers || !loaded) {
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
          <Repos repos={repos} />
        </div>
        <div className="column">
          <Followers followers={followers} />
        </div>
      </div>
    </>
  )
}