import express from 'express';

export const createTodosRouter = todoRepository => {
  const todosRouter = express.Router();

  todosRouter.post('/', async (req, res) => {
    const createdTodo = await todoRepository.create(req.body);
    res.status(201).json(createdTodo);
  });

  return todosRouter;
};
