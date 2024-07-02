import { Router } from 'express';
import fs from 'fs';

import { VideoQuality } from '../../domain/entities/video-file';
import { GetVideoUseCase } from '../../use-cases/get-video/get-video';
import { GetVideosUseCase } from '../../use-cases/get-videos/get-videos';
import { WatchVideoUseCase } from '../../use-cases/watch-video/watch-video';
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

router.get("/:id/watch/:resolution", async (req, res) => {
    const useCase = new WatchVideoUseCase(videosRepository);
    const {
      videoPath,
      streamLength,
      dataToRead,
    } = await useCase.execute({
        id: Number(req.params.id),
        resolution: req.params.resolution as VideoQuality,
    });

    res.setHeader("Accept-Ranges", "bytes");
    res.contentType("video/mp4");

    const range = req.headers.range;

   if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = Math.min(start + dataToRead, streamLength - 1);
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${streamLength}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': streamLength,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

router.get("/", async (req, res) => {
    const useCase = new GetVideosUseCase(videosRepository);
    const video = await useCase.execute();
    res.send(video);
});

export default router;
