export class DbTestHelper {
  #todosCollection;

  constructor(mongoClient) {
    this.#todosCollection = mongoClient.db().collection('todos');
  }
}
