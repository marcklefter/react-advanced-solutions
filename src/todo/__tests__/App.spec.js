import { 
  render, 
  screen,
  waitFor
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  rest
} from 'msw';

import {
  setupServer
} from 'msw/node';

import {
  App
} from '../App';

// ...

const todos = require('./todos.json');

const server = setupServer(
  rest.get(
    'http://jsonplaceholder.typicode.com/todos',
    async (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(todos))
    }
  ),
  rest.delete(
    'http://jsonplaceholder.typicode.com/todos/:todoId',
    async (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

// ...

test('should render a list of todos upon initial render', async () => {
  render(<App />);

  const renderedTodos = await screen.findAllByRole('todo-title');
  expect(renderedTodos).toHaveLength(todos.length);
  expect(renderedTodos.map(todo => todo.textContent)).toEqual(todos.map(todo => todo.title));
});

test('should delete a todo', async () => {
  render(<App />);

  const closeButtons = await screen.findAllByRole('todo-delete');
  userEvent.click(closeButtons[0]);
  
  // note: Ensure that the proper (async) deleteTodo callback in the App component is used!
  await waitFor(() => {
     expect(screen.getAllByRole('todo-title')).toHaveLength(todos.length - 1);
  });
});