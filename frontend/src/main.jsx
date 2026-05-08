import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { TodoService } from './services/TodoService.js';

const todoService = new TodoService('/api/todos');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App todoService={todoService} />
  </StrictMode>,
);
