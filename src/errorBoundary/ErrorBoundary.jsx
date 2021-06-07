import React, {
  useContext
} from 'react';

// ...

const ErrorContext = React.createContext();

export function useError() {
  return useContext(ErrorContext);
}

export class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  trace = (error, errorInfo) => {
    console.log(error, errorInfo);
  }

  capture = error => {
    this.setState({
      error
    });
  }

  retry = () => {
    this.setState({
      error: null
    });
  }

  // ...

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    this.trace(error, errorInfo);
  }

  render() {
    const {
      error
    } = this.state;

    if (error) {
      const {
        Fallback
      } = this.props;
      
      return <Fallback error={error} retry={this.retry} />
    }

    return (
      <ErrorContext.Provider value={{
        capture: this.capture,
        trace: this.trace
      }}>
        {this.props.children}
      </ErrorContext.Provider>
    )
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.error && prevState.error === this.state.error) {
      this.retry();
    }
  }
}