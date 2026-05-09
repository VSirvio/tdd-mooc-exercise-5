import { useEffect, useState } from 'react';
import TodoCreationForm from './components/TodoCreationForm.jsx';
import TodoEditForm from './components/TodoEditForm.jsx';
import TodoList from './components/TodoList.jsx';

const App = ({ todoService }) => {
  const [todos, setTodos] = useState([]);
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const createTodo = async content => {
    await todoService.create({ content });
    setTodos(await todoService.fetchAll());
  };

  const editTodo = todoId => {
    setEditedTodoId(todoId);
  };

  const sendTodoEdit = async editedContent => {
    await todoService.update({ id: editedTodoId, content: editedContent });
    setEditedTodoId(null);
    setTodos(await todoService.fetchAll());
  };

  useEffect(() => {
    const fetchData = async () => {
      setTodos(await todoService.fetchAll());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (editedTodoId !== null) {
    const content = todos?.find(todo => todo.id === editedTodoId)?.content || '';
    return <TodoEditForm content={content} handler={sendTodoEdit} />;
  }

  return (
    <>
      <h1>Todos</h1>
      {isLoading || <TodoList todos={todos} editTodo={editTodo} />}
      <TodoCreationForm handler={createTodo} />
    </>
  );
};

export default App;
