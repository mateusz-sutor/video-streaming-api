import { Router } from 'express';

import { GetVideoUseCase } from '../../use-cases/get-video/get-video';
import { GetVideosUseCase } from '../../use-cases/get-videos/get-videos';
import { PostgresVideosRepository } from '../db/repositories';

const router = Router();

const videosRepository = new PostgresVideosRepository();

router.get("/:id", async (req, res) => {
    const useCase = new GetVideoUseCase(videosRepository);
    const video = await useCase.execute({
        id: Number(req.params.id),
    });
    res.send(video);
});

router.get("/", async (req, res) => {
    const useCase = new GetVideosUseCase(videosRepository);
    const video = await useCase.execute();
    res.send(video);
});

export default router;
