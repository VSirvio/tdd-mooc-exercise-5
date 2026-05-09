const TodoList = ({ todos, props }) => (
  <ul>
    {todos.map(todo => <li key={todo.id}>{todo.content}</li>)}
  </ul>
);

export default TodoList;
