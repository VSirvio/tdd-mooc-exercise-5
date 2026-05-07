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

  app.get('/', async (req, res) => {
    await todos.insertOne({ content: 'Hello from database' });
    const fetchedTodo = await todos.findOneAndDelete({});
    res.send(fetchedTodo.content);
  });

  app.get('/api/todos', async (req, res) => {
    const todos = await todoRepository.fetchAll();
    res.json(todos);
  });

  app.post('/api/todos', async (req, res) => {
    const createdTodo = await todoRepository.create(req.body);
    res.status(201).json(createdTodo);
  });

  const todosRouter = createTodosRouter(todoRepository);
  app.use('/api/todos', todosRouter);

  return app;
};

export { createApp };
