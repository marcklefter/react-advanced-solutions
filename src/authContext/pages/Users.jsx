import {
  useState,
  useEffect
} from 'react';

import {
  Link,
  Redirect,
  Route,
  useRouteMatch
} from 'react-router-dom';

import axios from 'axios';

import {
  User
} from '../components';

export function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const result = await axios('https://jsonplaceholder.cypress.io/users');

      setUsers(result.data);
    }

    fetchUsers();
  }, []);

  const {
    path,
    url
  } = useRouteMatch();

  if (!users) {
    return 'Loading users...';
  }
    
  return (
    <>
      <ul>
        {users.map(({ id, name }) => (
          <li key={id}>
            <Link to={`${url}/${id}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <Route path={`${path}/:id`} render={({ match }) => {
        const user = users.find(user => user.id === +match.params.id);

        return user
          ? <User user={user} />
          : <Redirect to="/users" />
      }} />
    </>
  )
}