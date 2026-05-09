const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {todo.content}
        <button>Edit</button>
      </li>
    ))}
  </ul>
);

export default TodoList;
