export class TodoService {
  #apiUrl;

  constructor(apiUrl) {
    this.#apiUrl = apiUrl;
  }

  async fetchAll() {
    const getResponse = await fetch(this.#apiUrl);
    const fetchedTodos = await getResponse.json();
    return fetchedTodos;
  }

  async create(todo) {
    const postResponse = await fetch(this.#apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const createdTodo = await postResponse.json();
    return createdTodo;
  }

  async update(todoEditData) {
    await fetch(this.#apiUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoEditData),
    });
    return todoEditData;
  }
}
