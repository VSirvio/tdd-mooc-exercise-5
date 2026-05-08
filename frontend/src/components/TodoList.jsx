const TodoList = props => (
  <ul>
    {props.todos.map(todo => <li key={todo.id}>{todo.content}</li>)}
  </ul>
);

export default TodoList;
