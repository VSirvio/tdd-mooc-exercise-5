import express from 'express';
import { createTodosRouter } from './controllers/todos.js';

const createApp = todoRepository => {
  const app = express();

  app.use(express.json());

  const todosRouter = createTodosRouter(todoRepository);
  app.use('/api/todos', todosRouter);

  return app;
};

export { createApp };
