import { useEffect, useState } from 'react';

const App = () => {
  const [backendMsg, setBackendMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const postResponse = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'To the database and back again' }),
      });
      const createdTodo = await postResponse.json();

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
