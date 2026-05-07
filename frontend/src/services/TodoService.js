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
}
