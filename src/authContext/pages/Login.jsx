import {
  Redirect,

  useLocation
} from 'react-router-dom';

import {
  useAppContext
} from '../AppProvider';

export function Login() {
  const location = useLocation();
  
  const {
    user,

    loginError,
    login
  } = useAppContext();

  if (user) {
    const redirectTo = location.state?.from ?? '/';

    return <Redirect to={redirectTo} />;
  }

  const handleSubmit = e => {
    e.preventDefault();

    login(e.target.login.value);
  };

  return (
    <>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input id="login" />
      </form>
      {loginError && 'Login was incorrect'}
    </>
  )
}