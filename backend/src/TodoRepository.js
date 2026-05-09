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

  async clear() {
    await this.#todosCollection.drop();
  }
}
