export function todosReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TODOS':
      return action.todos;

    case 'CREATE_TODO':
      return [
        {
          id: Date.now(),
          completed: false,

          title: action.title
        },
        ...state
      ];

    case 'DELETE_TODO':
      return state.filter(
        todo => todo.id !== action.todoId
      );

    case 'UPDATE_TODO':
      return state.map(todo => {
        if (todo.id === action.todoId) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }

        return todo;
      });

    default:
      return state;
  }
};