const TodoList = ({ todos, editTodo, completeTodo }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id} style={todo.state === 'completed' ? { textDecoration: 'line-through' } : {}}>
        {todo.content}
        <button onClick={() => editTodo(todo.id)}>Edit</button>
        <button onClick={() => completeTodo(todo.id)}>Complete</button>
      </li>
    ))}
  </ul>
);

export default TodoList;
