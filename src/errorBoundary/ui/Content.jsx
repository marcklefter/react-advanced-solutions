import React, {
  useState
} from 'react';

import {
  ErrorBoundary
} from '../ErrorBoundary';

import Feed from './Feed';
import Search from './Search';

// ...
// Lazy-loaded component, with / without simulated error.

// const SearchComponent = React.lazy(() => import('./Search'));

// const SearchComponent = React.lazy(() => {
//   return Promise.reject(new Error('Failed to load Search component'));
// });

// ...
// Note: Remove the static Search import above.
//
// function Search() {
//   return (
//     <ErrorBoundary Fallback={() => 'Could not load Search'}>
//       <React.Suspense fallback={'Loading Search...'}>
//         <SearchComponent />
//       </React.Suspense>
//     </ErrorBoundary>
//   )
// }

// ...

// ...

const views = {
  Feed,
  Search
};

// ...

export function Content() {
  const [view, setView] = useState('Feed');

  const View = views[view];
  const entries = Object.entries(views);

  return (
    <>
      <nav style={{ marginBottom: 50 }}>
        {entries.map(([key], index) => (
          <a
            key={key} 
            href 
            style={{ 
              cursor: 'pointer',
              color: key === view ? 'black' : 'gray'
            }} 
            onClick={() => setView(key)}>{key} {index !== entries.length -1 && ' | '}</a>
        ))}
      </nav>
      <View />
    </>
  )
}