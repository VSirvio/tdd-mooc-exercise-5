export class TodoRepository {
  fetchAll() {
    return [];
  }

  create(todo) {
    return { ...todo, id: 1 };
  }
}
