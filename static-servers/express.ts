import express from 'express';
import path from 'path';

const expressRouter = express.Router();
const staticPath = path.join(__dirname, '..', 'out');

expressRouter.use(express.static(staticPath));

expressRouter.get(/(.*)/, (_, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

export default expressRouter;
