export class DbTestHelper {
  #todosCollection;

  constructor(mongoClient) {
    this.#todosCollection = mongoClient.db().collection('todos');
  }

  async getTodoById(id) {
    const fetchedTodo = await this.#todosCollection.findOne({ _id: id });
    return { id: fetchedTodo._id, content: fetchedTodo.content };
  }
}
