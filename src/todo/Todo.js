import {
  memo
} from 'react'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled';

const todo = css`
    padding: 8px 16px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
`;

const Checkbox = styled.input`
    appearance: none;
`;

const unchecked = 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E';
const checked = 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E';

const Label = styled.label`
    background-image: url(${props => props.completed
    ? checked
    : unchecked
  });
    color: ${props => props.completed ? '#d9d9d9' : 'initial'};
    text-decoration: ${props => props.completed
    ? 'line-through'
    : 'none'};
    background-position: center left;
    background-repeat: no-repeat;
    padding: 15px 15px 15px 60px;
    display: inline-block;
`;

const Close = styled.a`
    font-size: 22px;
    color: #cc9a9a;
    
    &:after {
        content: 'x';
    }
    
    &:hover {
        color: #af5b5e;
    }
`;

let Todo = ({
  id,
  title,
  completed,
  deleteTodo,
  updateTodo,

  focused,
  setFocused
}) => {
  const style = {
    border: focused ? '2px solid' : 'none'
  };

  return (
    <div 
      css={todo} 
      style={style} 
      onMouseEnter={() => setFocused(id)}
    >
      <div>
        <Checkbox
          id={id}
          type="checkbox"
          onClick={() => updateTodo(id)}
        />
        <Label
          htmlFor={id}
          completed={completed}
          role="todo-title"
        >
          {title}
        </Label>
      </div>
      <Close role="todo-delete" onClick={() => deleteTodo(id)} />
    </div>
  )
};

Todo = memo(Todo);

export { Todo };