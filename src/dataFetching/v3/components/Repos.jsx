import {
  useFetch,
} from '../useFetch';

export const Repos = ({ endpoint }) => {
  const {
    data: repos
  } = useFetch(endpoint);

  if (!repos) {
    return 'Loading repos...';
  }
  
  return (
    <>
      <h2>Repositories</h2>
      {repos.map((repo, i) => <p key={i}>{repo.name}</p>)}
    </>
  );
}