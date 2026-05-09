import { ObjectId } from 'mongodb';

export class TodoRepository {
  #todosCollection;

  constructor(mongoClient) {
    this.#todosCollection = mongoClient.db().collection('todos');
  }

  async fetchAll() {
    const fetchedTodos = await this.#todosCollection.find().toArray();
    return fetchedTodos.map(todo => ({ id: todo._id, content: todo.content }));
  }

  async create(todo) {
    const result = await this.#todosCollection.insertOne(todo);
    return { id: result.insertedId, content: todo.content };
  }

  async update(todo) {
    const filter = { _id: new ObjectId(todo.id) };
    const updateDoc = { $set: { content: todo.content } };
    const result = await this.#todosCollection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return null;
    }

    return todo;
  }

  async clear() {
    await this.#todosCollection.drop();
  }
}
