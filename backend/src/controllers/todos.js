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

  return todosRouter;
};
