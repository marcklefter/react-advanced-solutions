import {
  useFetch,
} from '../useFetch';

export const Followers = ({ endpoint }) => {
  const {
    data: followers
  } = useFetch(endpoint);

  if (!followers) {
    return 'Loading followers...';
  }

  return (
    <>
      <h2>Followers</h2>
      {followers.map((follower, i) => <p key={i}>{follower.login}</p>)}
    </>
  );
}