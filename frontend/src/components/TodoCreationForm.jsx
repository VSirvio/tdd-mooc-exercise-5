const TodoCreationForm = ({ handler }) => {
  const submit = event => {
    handler('Go jogging')
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Write a new todo here" />
      <button>Create</button>
    </form>
  );
};

export default TodoCreationForm;
