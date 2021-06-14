import {
  useQuery
} from 'react-query';

import {
  fetchResource
} from '../util';

export const Followers = ({ endpoint }) => {
  const {
    data: followers,
    isLoading
  } = useQuery(
    endpoint, 
    () => fetchResource(endpoint)
  );
  
  if (isLoading) {
    return 'Loading followers...';
  }

  return (
    <>
      <h2>Followers</h2>
      {followers.map((follower, i) => <p key={i}>{follower.login}</p>)}
    </>
  );
}