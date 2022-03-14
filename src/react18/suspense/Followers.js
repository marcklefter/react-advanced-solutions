import {
  fetchResource
} from './util';

import useSWR from 'swr';

// ...

export const Followers = ({ endpoint }) => {
  const {
    data
  } = useSWR(endpoint, fetchResource, { suspense: true });

  return (
    <>
      <h2>Followers</h2>
      {data.map((follower, i) => <p key={i}>{follower.login}</p>)}
    </>
  );
}