import {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useRef
} from 'react';

import axios from 'axios';

// ...

export function fetchUser(id, delayMs = 3000) {
  return new Promise((resolve, reject) => {
    setTimeout(
      async () => {
        try {
          resolve((await axios(`http://jsonplaceholder.typicode.com/users/${id}`)).data);
        } catch (error) {
          reject(error);
        }
      },
      delayMs
    );
  });
}

// ...

const baseStyle = {
  textAlign: 'center'
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20
};

// ...

function useIsMounted() {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, []);

  return useCallback(() => {
    return mountedRef.current;
  }, []);
}

function useFetch(fetcher) {
  const [fetchState, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'FETCH_REQUEST':
          return {
            ...state,
            loading: true
          };

        case 'FETCH_SUCCESS':
          return {
            loading: false,
            result: action.result
          }

        default:
          throw new Error();
      }
    },
    {
      loading: false,
      result: null
    }
  );

  const isMountedFunction = useIsMounted();

  useEffect(() => {
    dispatch({
      type: 'FETCH_REQUEST'
    });

    fetcher()
      .then(result => {
        if (isMountedFunction()) {
          dispatch({
            type: 'FETCH_SUCCESS',
            result
          })
        }
      });
  }, [fetcher, isMountedFunction]);

  return fetchState;
}

// ...

export function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      <button onClick={() => setShow(false)}>Hide</button>
      {show && <AppInternal />}
    </>
  )
}

function AppInternal() {
  const [userId, setUserId] = useState(1);

  const {
    loading,
    result: user
  } = useFetch( 
    useCallback(() => fetchUser(userId), [userId])
  );

  const handleChange = e => {
    setUserId(+e.target.value);
  };


  return (
    <>
      <div style={inputStyle}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
        />
      </div>

      <div style={baseStyle}>
        {loading && 'Loading...'}
        {user && (
          <p>Name: {user.name}</p>
        )}
      </div>
    </>
  )
}