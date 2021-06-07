import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  useError,
  useDangerousEffect
} from '../ErrorBoundary';

export function Profile() {
  const [profile, setProfile] = useState(null);

  const {
    capture,
    trace
  } = useError();

  useEffect(() => {
    async function fetchProfile() {
      const url = `https://randomuser${Math.random() > 0.5 ? '.me' : ''}/api/`;

      try {
        // const result = await axios('https://randomuser.me/api/');
        const result = await axios(url);

        setProfile(result.data.results[0]);
      } catch (error) {
        capture(error);
      }
    }

    fetchProfile();
  }, [capture]);

  const onEditDetails = () => {
    try {
      throw new Error('Could not edit user details');
    } catch (error) {
      trace(error);
    }
  };

  // ...

  if (!profile) {
    return null;
  }

  const {
    name,
    picture
  } = profile;

  return (
    <>
      <p>{name.first} {name.last}</p>
      <div style={{ marginBottom: 50 }}>
        <img src={picture.large} alt="" />
      </div>
      <button onClick={onEditDetails}>Edit Details</button>
    </>
  )
}