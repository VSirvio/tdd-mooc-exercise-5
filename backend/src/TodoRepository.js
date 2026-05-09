import { ObjectId } from 'mongodb';

export class TodoRepository {
  #todosCollection;

  constructor(mongoClient) {
    this.#todosCollection = mongoClient.db().collection('todos');
  }

  async fetchAll() {
    const fetchedTodos = await this.#todosCollection.find().toArray();
    return fetchedTodos.map(todo => ({ id: todo._id, content: todo.content, ...(todo.state && { state: todo.state }) }));
  }

  async create(todo) {
    const result = await this.#todosCollection.insertOne(todo);
    return { id: result.insertedId, content: todo.content };
  }

  async update(todo) {
    const filter = { _id: new ObjectId(todo.id) };
    const updateDoc = {
      $set: {
        ...(todo.content !== undefined ? { content: todo.content } : {}),
        ...(todo.state !== undefined ? { state: todo.state } : {}),
      },
    };
    const options = { returnDocument: 'after' };
    const updatedTodo = await this.#todosCollection.findOneAndUpdate(filter, updateDoc, options);

    if (updatedTodo === null) {
      return null;
    }

    const result = { id: updatedTodo._id, content: updatedTodo.content };
    if (updatedTodo.state) {
      result.state = updatedTodo.state;
    }

    return result;
  }

  async clear() {
    await this.#todosCollection.drop();
  }
}
