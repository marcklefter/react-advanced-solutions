import {
  useState
} from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(false);

  // ...
  // The following login / logout methods only demonstrate the basic authentication process; in a real-world 
  // application the credentials (e.g. username and password) are typically sent to an API backend to be 
  // authenticated. If successful, a token is returned and will be stored as the 'user' state (and used for subsequent
  // API requests). 
  //
  // E.g. a real-world login method may look as follows:
  //
  // const login = async (credentials) => {
  //   try {
  //     const result = await axios.post('https://api.example.com/authenticate', credentials);
  //     setUser(result.token);
  //     setLoginError(false);
  //   } catch (error) {
  //     setLoginError(true);
  //   }
  // };

  const login = async (credential) => {
    if (credential === 'admin') {
      setUser(credential);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loginError,

    login,
    logout
  };
}