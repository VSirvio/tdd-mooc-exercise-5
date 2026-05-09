import { useEffect, useState } from 'react';
import TodoCreationForm from './components/TodoCreationForm.jsx';
import TodoList from './components/TodoList.jsx';

const App = ({ todoService }) => {
  const [todos, setTodos] = useState([]);

  const createTodo = async content => {
    const createdTodo = await todoService.create({ content });
    setTodos(await todoService.fetchAll());
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTodos = await todoService.fetchAll();
      setTodos(fetchedTodos);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <TodoList todos={todos} />
      <TodoCreationForm handler={createTodo} />
    </>
  );
};

export default App;
