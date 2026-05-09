import { useState } from 'react';

const TodoEditForm = ({ content, handler }) => {
  const [editedTodo, setEditedTodo] = useState(content);

  const submit = event => {
    event.preventDefault();
    handler(editedTodo);
  };

  return (
    <form onSubmit={submit}>
      <input
        value={editedTodo}
        onChange={event => setEditedTodo(event.target.value)}
        maxLength="100"
        required
      />
      <button>Save</button>
    </form>
  );
};

export default TodoEditForm;
