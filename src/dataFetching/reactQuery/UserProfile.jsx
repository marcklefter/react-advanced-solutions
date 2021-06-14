import {
  useQuery
} from 'react-query';

import {
  fetchResource,
  fetchImage
} from './util';

import {
  Followers,
  Repos,
} from './components';

import {
  BASE_URL
} from './constants';

// ...

export const UserProfile = ({ user }) => {
  const {
    data: details, 
    isLoading: detailsLoading
  } = useQuery(
    user, 
    () => fetchResource(`${BASE_URL}/${user}`, 3000)
  );

  const avatarUrl = details?.avatar_url;
  
  const {
    isLoading: avatarLoading
  } = useQuery(
    `${user}/avatar`, 
    () => fetchImage(avatarUrl),
    {
      enabled: !!avatarUrl
    }
  );

  if (detailsLoading || avatarLoading) {
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