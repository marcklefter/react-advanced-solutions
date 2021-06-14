import {
  useQuery
} from 'react-query';

import {
  fetchResource
} from '../util';

export const Repos = ({ endpoint }) => {
  const {
    data: repos,
    isLoading
  } = useQuery(
    endpoint, 
    () => fetchResource(endpoint)
  );

  if (isLoading) {
    return 'Loading repos...';
  }
  
  return (
    <>
      <h2>Repositories</h2>
      {repos.map((repo, i) => <p key={i}>{repo.name}</p>)}
    </>
  );
}