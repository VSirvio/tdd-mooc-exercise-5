import express from 'express';
import { createTestingRouter } from './controllers/testing.js';
import { createTodosRouter } from './controllers/todos.js';

const createApp = todoRepository => {
  const app = express();

  app.use(express.json());

  const todosRouter = createTodosRouter(todoRepository);
  app.use('/api/todos', todosRouter);

  if (process.env.NODE_ENV === 'test') {
    const testingRouter = createTestingRouter(todoRepository);
    app.use('/api/testing', testingRouter);
  }

  return app;
};

export { createApp };
