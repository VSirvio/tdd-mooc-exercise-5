const TodoList = ({ todos, editTodo, completeTodo }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {todo.content}
        <button onClick={() => editTodo(todo.id)}>Edit</button>
        <button onClick={() => completeTodo(todo.id)}>Complete</button>
      </li>
    ))}
  </ul>
);

export default TodoList;
