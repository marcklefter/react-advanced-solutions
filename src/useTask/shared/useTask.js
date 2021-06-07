import {
  useState,
  useEffect,
  useReducer
} from 'react';

import {
  reducer,
  initialState
} from './taskReducer';

export function useTask() {
  const [
    state, 
    dispatch
  ] = useReducer(reducer, initialState);

  const [
    task,
    setTask
  ] = useState(null);

  useEffect(() => {
    if (!task) {
      return;
    }

    dispatch({
      type: 'TASK_EXECUTE'
    });

    task
      .then(result => {
        if (!task.cancelled) {
          dispatch({
            type: 'TASK_SUCCESS',
            result
          });
        }
      })
      .catch(error => {
        if (!task.cancelled) {
          dispatch({
            type: 'TASK_FAILURE',
            error
          });
        }
      });
    
    return () => {
      task.cancel?.();
      task.cancelled = true;
    }
  }, [task]);

  const cancel = () => {
    setTask(null);

    dispatch({
      type: 'TASK_CANCEL'
    });
  };

  return {
    ...state,
    run: setTask,
    cancel
  };
}