import { useEffect, useState } from 'react';

const App = () => {
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
