import {
  useEffect,
  useState
} from 'react';

import {
  Followers,
  Repos,
} from './components';

import {
  BASE_URL
} from './constants';

import {
  fetchResource,
  fetchImage
} from './util';

// ...

export const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const [
        details,
        repos,
        followers
      ] = await Promise.all([
        fetchResource(`${BASE_URL}/${user}`),
        fetchResource(`${BASE_URL}/${user}/repos`),
        fetchResource(`${BASE_URL}/${user}/followers`),
      ]);

      await fetchImage(details.avatar_url);

      setProfile({
        details,
        repos,
        followers
      })
    }

    fetchProfile();
  }, [user]);

  if (!profile) {
    return <p>Loading {user}...</p>
  }

  return (
    <>
      <div className="row" style={{ flexDirection: 'column' }}>
        <div>
          <img className="image" src={profile.details.avatar_url} alt="" />
        </div>
        <h1>{profile.name}</h1>
      </div>
      <div className="row">
        <div className="column">
          <Repos repos={profile.repos} />
        </div>
        <div className="column">
          <Followers followers={profile.followers} />
        </div>
      </div>
    </>
  )
}