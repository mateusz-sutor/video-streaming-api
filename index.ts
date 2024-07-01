import express from 'express';

import commonRouter from './src/infrastructure/api-controllers/common';
import videosRouter from './src/infrastructure/api-controllers/videos';

const app = express();

app.use('/api/', commonRouter);
app.use('/api/videos', videosRouter);

if (import.meta.env.PROD){
  app.listen(Number(import.meta.env.VITE_PORT));
  console.log('App listen on ' + import.meta.env.VITE_PORT);
}

export const viteNodeApp = app;
