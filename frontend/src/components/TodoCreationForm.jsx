import { useState } from 'react';

const TodoCreationForm = ({ handler }) => {
  const [newTodo, setNewTodo] = useState('');

  const submit = event => {
    handler(newTodo);
  };

  return (
    <form onSubmit={submit}>
      <input
        value={newTodo}
        onChange={event => setNewTodo(event.target.value)}
        placeholder="Write a new todo here"
      />
      <button>Create</button>
    </form>
  );
};

export default TodoCreationForm;
