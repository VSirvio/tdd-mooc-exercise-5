import { useEffect, useState } from 'react';

const App = () => {
  const [backendMsg, setBackendMsg] = useState('');
  const [receivedMsg, setReceivedMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const postResponse = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'To the database and back again' }),
      });
      const createdTodo = await postResponse.json();

      const getResponse = await fetch('/api/todos');
      const fetchedTodos = await getResponse.json();

      const fetchedTodo = fetchedTodos.find(todo => todo.id === createdTodo.id);
      setReceivedMsg(fetchedTodo.content);

      const response = await fetch('/api');
      setBackendMsg(await response.text());
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <p>{backendMsg}</p>
    </>
  );
};

export default App;
