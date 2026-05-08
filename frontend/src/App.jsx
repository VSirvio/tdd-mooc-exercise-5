import { useEffect, useState } from 'react';
import { TodoService } from './services/TodoService.js';

const todoService = new TodoService('/api/todos');

const App = ({ todoService }) => {
  const [receivedMsg, setReceivedMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const todo = { content: 'To the database and back again' };
      const createdTodo = await todoService.create(todo);

      const fetchedTodos = await todoService.fetchAll();

      const fetchedTodo = fetchedTodos.find(todo => todo.id === createdTodo.id);
      setReceivedMsg(fetchedTodo.content);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <p>{receivedMsg}</p>
    </>
  );
};

export default App;
