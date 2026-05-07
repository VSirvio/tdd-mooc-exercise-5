import { MongoClient } from 'mongodb';
import { createApp } from './app.js';
import { TodoRepository } from './TodoRepository.js';

const DATABASE_URI = process.env.DATABASE_URI;

const mongoClient = new MongoClient(DATABASE_URI);
const todoRepository = new TodoRepository(mongoClient);

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
