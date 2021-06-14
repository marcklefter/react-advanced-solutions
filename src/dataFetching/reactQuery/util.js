import {
  QueryClient
} from 'react-query';

import axios from 'axios';

// ...

const delay = (resolveWith, ms) => {
  return new Promise(resolve => {
    setTimeout(
      () => resolve(resolveWith),
      ms
    )
  });
}

export const fetchResource = async (uri, delayMs) => {
  const result = await axios(uri, {
    headers: {
      'Authorization': 'Bearer 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'
    }
  });

  return delayMs ? delay(result.data, delayMs) : result.data;
}

export const fetchImage = src => {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      resolve(src)
    }
  });
}

// ...

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
});


const preFetch = url => {
  queryClient.prefetchQuery(url, () => fetchResource(url));
}

export {
  queryClient,
  preFetch
};