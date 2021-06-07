import {
  ErrorBoundary
} from './ErrorBoundary';

import {
  Profile,
  Content
} from './ui';

import styles from './App.module.css';

// ...

// fallback component for the top-level error boundary.
function AppFallback({ error, retry }) {
  return (
    <div>
      <p>A critical application error occurred: {error.message}</p>
      <button onClick={() => console.log(error)}>Report Feedback</button>
      <button onClick={retry}>Retry</button>
    </div>
  )
}

export function App() {
  return (
    <div className={styles.app}>
      {/* Top-level error boundary. */}
      <ErrorBoundary Fallback={AppFallback}>
        <div className={styles.section}>
          <Profile />
        </div>
        <div className={styles.section}>
          <Content />
        </div>
      </ErrorBoundary>
    </div>
  )
}

