import express from 'express';
import { MongoClient } from 'mongodb';
import { createTodosRouter } from './controllers/todos.js';

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27018/test';

const mongoClient = new MongoClient(DATABASE_URI);
const database = mongoClient.db('todo-app');
const todos = database.collection('todos');

const createApp = todoRepository => {
  const app = express();

  app.use(express.json());

  const todosRouter = createTodosRouter(todoRepository);
  app.use('/api/todos', todosRouter);

  return app;
};

export { createApp };
