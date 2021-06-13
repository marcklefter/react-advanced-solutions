import {
  Fragment as F
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  useAppContext
} from '../AppProvider';

export function Navigation({ links, style }) {
  const {
    user,
    
    logout
  } = useAppContext();
  
  return (
    <nav style={style}>
      {links.map(({ href, name }, i) => (
        <F key={i}>
          <Link to={href}>{name}</Link>
          {(i !== links.length - 1) && ' '}
        </F>
      ))}
      {user && (
        <button
          onClick={logout}
          style={{
            marginLeft: 20
          }}
        >
          Logout
        </button>
      )}
    </nav>
  )
}

// ...
// Render navigation without an application context, using component composition (optional exercise part).
export function NavigationWithoutContext({ links, style, children }) {
  return (
    <nav style={style}>
      {links.map(({ href, name }, i) => (
        <F key={i}>
          <Link to={href}>{name}</Link>
          {(i !== links.length - 1) && ' '}
        </F>
      ))}
      {children}
    </nav>
  )
}