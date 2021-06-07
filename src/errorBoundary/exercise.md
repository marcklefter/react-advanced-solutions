# Exercise: Error boundaries

In this exercise you will utilize React's error handling mechanism - __error boundaries__ - to improve the _fault tolerance_ of an example application.

> Also see the [introduction to error boundaries](https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries) chapter in the React documentation.

## Improving fault tolerance
Currently, our application suffers from an inability to handle errors in the following ways:

* When rendering feed items in `Feed.jsx`, whenever a **FeedItem** component fails to render, the resulting error propagates to the top-level error boundary.

  To prohibit this behaviour, implement the _TODO_ section in the **Feed** component to ensure that if a **FeedItem** fails to render, a fallback is shown for it; the other feed items will still be displayed.

* In the Search tab, entering the search query "fail" results in an error being thrown (and caught by the top-level boundary). 

  We'd like an ability to "retry" rendering the entire application.

  Implement retry functionality by:

    * Adding a "retry" class method in the **ErrorBoundary** component, that resets the error state and may be passed as a prop to a fallback component.

    * Render a Retry button in the fallback for the top-level boundary.

* The error resulting from a "failed search" should not propagate to the top-level boundary.

  * Add an error boundary at the proper level in the **Search** component, using the **SearchFallback** component as a fallback.

  * It'd be natural to allow the user to continue editing the search query and reset the error boundary "behind the scenes". 

    Add the following code to **ErrorBoundary**:

    ```javascript
    componentDidUpdate(_prevProps, prevState) {
      if (prevState.error && prevState.error === this.state.error) {
        this.retry();
      }
    }
    ```

## Handling errors outside component render
To handle errors occurring in e.g. an effect or event handler - i.e. _outside_ the component render - the **ErrorBoundary** component needs to provide functionality that "extends" to such code.

> Remember, error boundaries by default do not catch errors in e.g. event handlers or asynchronous code (such as useEffect).

E.g., if a component needs to catch and handle an error in an event handler:

 ```javascript
  // use a custom useError hook to access error handling methods from the parent ErrorBoundary component, provided via a React Context.
  const {
    capture
  } = useError()

  const handleClick = async () => {
    // perform an asynchronous operation in an event handler, and catch errors if they occur.
    try {
      await doAsyncOp();
    } catch (error) {
      // handle the error using the (centralized) error handling logic available in the parent ErrorBoundary component.
      capture(error);
    }
  }
  ```

  Follow these steps in `ErrorBoundary.jsx` (note: Use the `dependencyContext` example as a guide):

  * Add a context called `ErrorContext`.

  * Export an `useError` hook which returns the error context value.

  * In the **ErrorBoundary** component, add a class method `capture` which is passed an error and then updates the component state with it.

  * In the component render, wrap the rendering of `this.props.children` in the error context, passing an object containing the `capture` and `trace` class methods as the context value.

  In `Profile.jsx`, implement the _TODO_ sections. 

  > Note: Successfully capturing an error in the **Profile** component's `useEffect` call should result in the top-level error boundary's fallback being displayed.

  ## Optional: Code splitting
  There is not always a need to eagerly load all component code upon application startup.

  E.g., if the user never navigates to the Search tab, the corresponding component code doesn't have to be loaded initially.

  React's _code splitting_ allows for more granular control over loading components by splitting component code into separate chunks that may be lazily loaded. 

  Code split the **Search** component and ensure that its code chunk is only loaded when the user navigates to the Search tab:

  * Read about [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) in the documentation.

  * In `Content.jsx`, follow the example from the documentation to _dynamically_ import and render the **Search** component.

    > Note that you'll have to remove the static import of the **Search** component.

    Verify that code splitting works by viewing the Network panel in Chrome Devtools; a separate chunk should be loaded on demand when the user navigates to the Search tab.

  * Wrap the rendering of the dynamically loaded **Search** component in an error boundary, as also demonstrated in the documentation. 

    To simulate an error when loading component code, use the following call to `React.lazy` instead of the one with a dynamic import:

    ```javascript
    React.lazy(() => {
      return Promise.reject(new Error('Failed to load Search component'));
    });
    ```