import { useState } from 'react';

const TodoCreationForm = ({ handler }) => {
  const [newTodo, setNewTodo] = useState('');

  const submit = event => {
    event.preventDefault();
    handler(newTodo);
    setNewTodo('');
  };

  return (
    <form onSubmit={submit}>
      <input
        value={newTodo}
        onChange={event => setNewTodo(event.target.value)}
        placeholder="Write a new todo here"
        maxLength="100"
        required
      />
      <button>Create</button>
    </form>
  );
};

export default TodoCreationForm;
