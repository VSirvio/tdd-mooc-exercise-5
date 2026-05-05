import { useEffect, useState } from 'react';

const App = () => {
  const [backendMsg, setBackendMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
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
