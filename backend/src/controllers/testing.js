import express from 'express';

export const createTestingRouter = todoRepository => {
  const testingRouter = express.Router();

  testingRouter.post('/reset', async (req, res) => {
    await todoRepository.clear();
    res.status(204).end();
  });

  return testingRouter;
};
