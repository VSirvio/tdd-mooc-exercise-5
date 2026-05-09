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
    const filter = { _id: todo.id };
    const updateDoc = { $set: { content: todo.content } };
    await this.#todosCollection.updateOne(filter, updateDoc);
    return todo;
  }

  async clear() {
    await this.#todosCollection.drop();
  }
}
