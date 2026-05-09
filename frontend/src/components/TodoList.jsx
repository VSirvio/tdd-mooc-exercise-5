const TodoList = ({ todos, props }) => (
  <ul>
    {(props?.todos || todos).map(todo => <li key={todo.id}>{todo.content}</li>)}
  </ul>
);

export default TodoList;
