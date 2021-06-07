export function reducer(state, action = {}) {
  switch (action.type) {
    case 'TASK_EXECUTE':
      return {
        ...state,
        status: 'pending'
      };

    case 'TASK_SUCCESS':
      return {
        ...state,
        status: 'resolved',
        result: action.result
      };

    case 'TASK_FAILURE':
      return {
        ...state,
        status: 'rejected',
        error: action.error
      };

    case 'TASK_CANCEL':
      return {
        status: 'idle',
        result: null,
        error: null
      };

    default:
      throw new Error('Unknown action!');
  }
}

export const initialState = {
  status: 'idle',
  result: null,
  error: null
};