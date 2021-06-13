import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  Navigation,
  NavigationWithoutContext,
  NotFound,
  RouteGuard
} from './components';

import {
  Home,
  Login,
  Users
} from './pages';

import {
  AppProvider,
  useAppContext
} from './AppProvider';

// ...
// HoC for rendering the NavigationWithoutContext component (component composition, optional exercise part).
function NavigationWithoutContextWrapper(props) {
  const {
    user,
    logout
  } = useAppContext();

  return (
    <NavigationWithoutContext {...props}>
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
    </NavigationWithoutContext>
  )
}

// ...

export function App() {
  return (
    <AppProvider>
      <Router>
        {/* Change to <NavigationWithoutContextWrapper> for rendering using component composition 
        (optional exercise part). */}
        <Navigation
          links={[
            { href: '/', name: 'Home' },
            { href: '/users', name: 'Users' }
          ]}
          style={{
            marginBottom: 50
          }}
        />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <RouteGuard path="/users" component={Users} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </AppProvider>
  )
}