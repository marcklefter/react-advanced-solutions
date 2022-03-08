import axios from 'axios';

// ...
// For v1.
export function fetchUser(id, delayMs = 1000) {
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
// For v2.
export function fetchResource(resource, delayMs = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(
      async () => {
        try {
          resolve((await axios(`http://jsonplaceholder.typicode.com/${resource}`)).data);
        } catch (error) {
          reject(error);
        }
      },
      delayMs
    );
  });
}

export function fetchResourceCancellable(resource, delayMs = 1000) {
  const source = axios.CancelToken.source();

  const p = new Promise((resolve, reject) => {
    setTimeout(
      async () => {
        try {
          const result = await axios(`http://jsonplaceholder.typicode.com/${resource}`, {
            cancelToken: source.token
          });

          resolve(result.data);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request was cancelled');
          }

          reject(error);
        }
      },
      delayMs
    );
  });

  p.cancel = () => source.cancel();
  return p;
}