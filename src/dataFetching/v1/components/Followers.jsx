export const Followers = ({ followers }) => {
  return (
    <>
      <h2>Followers</h2>
      {followers.map((follower, i) => <p key={i}>{follower.login}</p>)}
    </>
  );
}