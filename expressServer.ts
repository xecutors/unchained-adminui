// src/expressRouter.ts
import express from 'express';
import path from 'path';

const router = express.Router();
const staticPath = path.join(__dirname, '..', 'out');

router.use(express.static(staticPath));

router.get('*', (_, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

export { router as expressRouter };
