import express from 'express';

export const createTodosRouter = todoRepository => {
  const todosRouter = express.Router();

  return todosRouter;
};
