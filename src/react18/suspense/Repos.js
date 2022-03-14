import {
  fetchResource
} from './util';

import useSWR from 'swr';

// ...

export const Repos = ({ endpoint }) => {
  const {
    data
  } = useSWR(endpoint, fetchResource, { suspense: true });

  return (
    <>
      <h2>Repositories</h2>
      {data.map((repo, i) => <p key={i}>{repo.name}</p>)}
    </>
  );
}