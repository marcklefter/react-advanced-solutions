import {
  reducer,
  initialState
} from '../taskReducer';

// ...

test('should return initial state', () => {
  const state = reducer();

  expect(state).toEqual(initialState);
});

test('should return pending state upon task execute', () => {
  const state = reducer(initialState, {
    type: 'TASK_EXECUTE'
  });

  expect(state).toEqual({
    status: 'pending',
    result: null,
    error: null
  });
});

test('should return resolved state upon task success', () => {
  const state = reducer({
    status: 'pending',
    result: null,
    error: null
  }, {
    type: 'TASK_SUCCESS',
    result: 'foo'
  });

  expect(state).toEqual({
    status: 'resolved',
    result: 'foo',
    error: null
  });
});

test('should return rejected state upon task failure', () => {
  const error = new Error('task failed');

  const state = reducer({
    status: 'pending',
    result: null,
    error: null
  }, {
    type: 'TASK_FAILURE',
    error
  });

  expect(state).toEqual({
    status: 'rejected',
    result: null,
    error
  });
});

test('should return initial state upon task cancel', () => {
  const state = reducer({
    status: 'pending',
    result: null,
    error: null
  }, {
    type: 'TASK_CANCEL'
  });

  expect(state).toEqual({
    status: 'idle',
    result: null,
    error: null
  });
});