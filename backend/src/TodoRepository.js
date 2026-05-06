export class TodoRepository {
  #todosCollection;

  constructor(mongoClient) {
    this.#todosCollection = mongoClient.db().collection('todos');
  }

  fetchAll() {
    return [];
  }

  async create(todo) {
    const result = await this.#todosCollection.insertOne(todo);
    return { id: result.insertedId, content: todo.content };
  }
}
