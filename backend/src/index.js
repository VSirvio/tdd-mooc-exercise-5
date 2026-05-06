import express from 'express';
import { MongoClient } from 'mongodb';

const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT || 3000;

const mongoClient = new MongoClient(DATABASE_URI);
const database = mongoClient.db('todo-app');
const todos = database.collection('todos');

const app = express();

app.get('/', async (req, res) => {
  await todos.insertOne({ content: 'Hello from database' });
  const fetchedTodo = await todos.findOneAndDelete({});
  res.send(fetchedTodo.content);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
