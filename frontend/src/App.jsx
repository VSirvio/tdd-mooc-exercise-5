import { useEffect, useState } from 'react';
import TodoList from './components/TodoList.jsx';

const App = ({ todoService }) => {
  const [todos, setTodos] = useState([]);
  const [receivedMsg, setReceivedMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const todo = { content: 'To the database and back again' };
      const createdTodo = await todoService.create(todo);

      const fetchedTodos = await todoService.fetchAll();
      setTodos(fetchedTodos);

      const fetchedTodo = fetchedTodos.find(todo => todo.id === createdTodo.id);
      setReceivedMsg(fetchedTodo.content);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <p>{receivedMsg}</p>
      <TodoList todos={todos} />
    </>
  );
};

export default App;
