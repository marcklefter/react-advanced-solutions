import {
  DependencyProvider,
  useDependency
} from './DependencyProvider';

// ...
// Components that uses the dependency context to acquire a service instance and global state.
function ComponentA() {
  const {
    setShouldLog,

    logService
  } = useDependency();

  logService('Rendering Component A');

  return (
    <button onClick={() => setShouldLog(prevShouldLog => !prevShouldLog)}>Switch Logging</button>
  )
}

function ComponentB() {
  const {
    shouldLog,
    
    logService
  } = useDependency();

  logService('Rendering Component B');

  return (
    <p>Logging: {shouldLog ? 'enabled' : 'disabled'}</p>
  )
}

export function App() {
  return (
    <DependencyProvider>
      <ComponentA />
      <ComponentB />
    </DependencyProvider>
  )
}