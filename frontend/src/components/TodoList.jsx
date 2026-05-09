const TodoList = ({ todos, editTodo }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {todo.content}
        <button onClick={() => editTodo(todo.id)}>Edit</button>
        <button>Complete</button>
      </li>
    ))}
  </ul>
);

export default TodoList;
