import React, {
  useState,
  useContext
} from 'react';

// ...
// Application dependencies (services). 
let logService;

// configure service implementation(s).
if (process.env.NODE_ENV === 'development') {
  logService = message => console.log(`LOG: ${message}`);
} else {
  // instantiate proper logging service for use in e.g. production environment.
  logService = () => {};
}

// ...

const DependencyContext = React.createContext();

export function DependencyProvider({ children }) {
  const [shouldLog, setShouldLog] = useState(true);

  const value = {
    shouldLog,
    setShouldLog,

    logService
  };

  return <DependencyContext.Provider value={value}>{children}</DependencyContext.Provider>
}

export function useDependency() {
  return useContext(DependencyContext);
} 