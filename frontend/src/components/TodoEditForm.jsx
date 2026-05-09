import { useState } from 'react';

const TodoEditForm = ({ handler }) => {
  const [editedTodo, setEditedTodo] = useState('');

  const submit = event => {
    event.preventDefault();
    handler(editedTodo);
  };

  return (
    <form onSubmit={submit}>
      <input
        value={editedTodo}
        onChange={event => setEditedTodo(event.target.value)}
      />
      <button>Save</button>
    </form>
  );
};

export default TodoEditForm;
