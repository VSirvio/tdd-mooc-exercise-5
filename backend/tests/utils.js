export class DbTestHelper {
  #todosCollection;

  constructor(mongoClient) {
    this.#todosCollection = mongoClient.db().collection('todos');
  }

  async fetchTodoFromDb(id) {
    const fetchedTodo = await this.#todosCollection.findOne({ _id: id });
    return { id: fetchedTodo._id, content: fetchedTodo.content };
  }

  async resetDb() {
    await this.#todosCollection.drop();
  }
}
