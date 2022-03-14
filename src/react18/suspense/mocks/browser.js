import { 
  rest,

  setupWorker 
} from 'msw';

import {
  BASE_URL
} from '../constants';

// ...

const handlers = [
  rest.get(`${BASE_URL}/*`, async (req, res, ctx) => {
    const originalResponse      = await ctx.fetch(req);
    const originalResponseData  = await originalResponse.json();

    const path  = req.url.pathname; 
    const delay = path.endsWith('repos') ? 2000 : req.url.pathname.endsWith('followers') ? 4000 : 1000;

    return res(
      ctx.delay(delay),
      ctx.json(originalResponseData)
    );
  })
]

// ...

export const worker = setupWorker(...handlers);