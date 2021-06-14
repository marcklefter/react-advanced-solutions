export const Repos = ({ repos }) => {
  return (
    <>
      <h2>Repositories</h2>
      {repos.map((repo, i) => <p key={i}>{repo.name}</p>)}
    </>
  );
}