import express from 'express';
import { MongoClient } from 'mongodb';

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27018/test';

const mongoClient = new MongoClient(DATABASE_URI);
const database = mongoClient.db('todo-app');
const todos = database.collection('todos');

const createApp = () => {};
const app = express();

app.get('/', async (req, res) => {
  await todos.insertOne({ content: 'Hello from database' });
  const fetchedTodo = await todos.findOneAndDelete({});
  res.send(fetchedTodo.content);
});

app.get('/api/todos', (req, res) => {
  res.end();
});

export { app };
