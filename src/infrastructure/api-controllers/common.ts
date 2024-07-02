import { Router } from 'express';

import { TestConnectionUseCase } from '../../use-cases/test-connection/test-connection';

const router = Router();

router.get("/heath-check", (req, res) => {
    res.sendStatus(200);
});

router.get('/test-connection', async (req, res) => {
  const useCase = new TestConnectionUseCase();
  const response = await useCase.execute();

  res.send(response);
});

export default router;
