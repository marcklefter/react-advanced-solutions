import {
  useEffect,
  useState,
  useReducer
} from 'react';

import {
  fetchResource,
  fetchImage
} from './util';

// ...

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        status: 'pending'
      };

    case 'FETCH_SUCCESS':
      return {
        status: 'resolved',
        data: action.payload
      };

    default:
      throw new Error(`Unsupported action type ${action.type}`)
  }
}

// ...

const cache = {};

const prefetches = {};

export const useFetch = url => {
  const [fetchState, dispatch] = useReducer(
    fetchReducer,
    {
      status: 'idle',
      data: null
    }
  );

  useEffect(() => {
    let abort = false;

    const doFetch = async () => {
      dispatch({
        type: 'FETCH_REQUEST'
      });

      if (cache[url]) {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: cache[url]
        });
      } else {
        const data = await (prefetches[url] ?? fetchResource(url));
        cache[url] = data;

        if (abort) return;

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data
        });
      }
    };

    doFetch();

    return function cleanup() {
      abort = true;
    };
  }, [url]);

  return fetchState;
}

export const useImageFetch = src => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    let abort = false;

    fetchImage(src)
      .then(() => {
        if (!abort) {
          setLoaded(true);
        }
      });

    return () => {
      abort = true;
    }
  }, [src]);

  return loaded;
}

export const preFetch = url => {
  prefetches[url] = fetchResource(url);
}