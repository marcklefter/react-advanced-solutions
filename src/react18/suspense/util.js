// ...
// This method will track the state of a promise (returned from a fetch call) and notify a suspense boundary while
// a fetch is pending by throwing the promise (as required by the Suspense mechanism). 
function suspensify(promise) {
  let status = "pending";
  let result;

  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "failure";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "failure") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

const _fetchImage = src => {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      resolve(src)
    }
  });
}

// uri -> promise. 
const promises = {};

// ...

export const useImageFetch = uri => {
  if (!uri) return;
  if (!promises[uri]) {
    promises[uri] = suspensify(_fetchImage(uri));
  }

  return promises[uri].read();
}

export const fetchResource = endpoint => {
  return fetch(
    endpoint,
    {
      headers: {
        Authorization: 'Bearer <Github PAT>'
      }
    }
  ).then(res => res.json());
}
