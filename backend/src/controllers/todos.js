import express from 'express';

export const createTodosRouter = todoRepository => {
  const todosRouter = express.Router();

  todosRouter.get('/', async (req, res) => {
    const todos = await todoRepository.fetchAll();
    res.json(todos);
  });

  todosRouter.post('/', async (req, res) => {
    const newTodoData = req.body;

    if (
      typeof newTodoData !== 'object' ||
      !newTodoData.content ||
      typeof newTodoData.content !== 'string' ||
      newTodoData.content.length > 100
    ) {
      res.status(400).json({ error: 'Invalid todo data' });
      return;
    }

    const createdTodo = await todoRepository.create(req.body);
    res.status(201).json(createdTodo);
  });

  todosRouter.patch('/', async (req, res) => {
    const todoEditData = req.body;

    if (
      typeof todoEditData !== 'object' ||
      typeof todoEditData.content !== 'string' ||
      todoEditData.content.length === 0 ||
      todoEditData.content.length > 100 ||
      typeof todoEditData.id !== 'string' ||
      todoEditData.id.length > 50
    ) {
      res.status(400).json({ error: 'Invalid todo data' });
      return
    }

    const editedTodo = await todoRepository.update(todoEditData);
    if (editedTodo === null) {
      res.sendStatus(404);
      return;
    }

    res.send(todoEditData);
  });

  return todosRouter;
};
