import {
  render,
  screen,
  fireEvent
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  TodoForm
} from '../TodoForm';

test('should initially render with an empty title', () => {
  render(<TodoForm />);

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('');
});

test('should submit the form with the entered title', () => {
  const createTodo = jest.fn();

  render(<TodoForm createTodo={createTodo} />);

  const input = screen.getByRole('textbox');
  userEvent.type(input, 'foo');
  expect(input).toHaveValue('foo');

  const form = screen.getByTestId('todo-form');
  fireEvent.submit(form);
  expect(input).toHaveValue('');

  expect(createTodo).toHaveBeenCalledTimes(1);
  expect(createTodo).toHaveBeenCalledWith('foo');
});