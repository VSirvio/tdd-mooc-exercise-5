import { useEffect, useState } from 'react';
import TodoCreationForm from './components/TodoCreationForm.jsx';
import TodoEditForm from './components/TodoEditForm.jsx';
import TodoList from './components/TodoList.jsx';

const App = ({ todoService }) => {
  const [todos, setTodos] = useState([]);
  const [editedTodoId, setEditedTodoId] = useState(null);

  const createTodo = async content => {
    await todoService.create({ content });
    setTodos(await todoService.fetchAll());
  };

  const editTodo = todoId => {
    setEditedTodoId(todoId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setTodos(await todoService.fetchAll());
    };
    fetchData();
  }, []);

  if (editedTodoId !== null) {
    return <TodoEditForm />;
  }

  return (
    <>
      <h1>Todos</h1>
      <TodoList todos={todos} editTodo={editTodo} />
      <TodoCreationForm handler={createTodo} />
    </>
  );
};

export default App;
