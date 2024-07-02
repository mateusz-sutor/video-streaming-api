import { eq } from 'drizzle-orm';

import { VideoEntity } from '../../../domain/entities';
import { VideoFile } from '../../../domain/entities/video-file';
import { VideosRepository } from '../../../domain/repositories/videos';
import db from '../init';
import { videos, videosFiles } from '../schema';

export class PostgresVideosRepository implements VideosRepository {
    async findById({id}: {id: number}) {
        const videoDb = await db.query.videos.findFirst({
            where: eq(videos.id, id),
        });

        const videoFiles = await db.query.videosFiles.findMany({
            where: eq(videosFiles.videoId, id),
        });

        if(!videoDb) return null;


        const video = new VideoEntity();
        video.id = videoDb?.id;
        video.title = videoDb?.title ?? '';
        video.description = videoDb?.description ?? '';
        video.length = videoDb?.length ?? NaN;
        video.videoFiles = videoFiles as VideoFile[];

        return video;
    }

    async findMany() {
        const videosDb = await db.query.videos.findMany();

        const videos = videosDb.map((videoDb) => {
            const video = new VideoEntity();

            video.id = videoDb?.id;
            video.title = videoDb?.title ?? '';
            video.description = videoDb?.description ?? '';
            video.length = videoDb?.length ?? NaN;

            return video;
        });
        return videos;
    }
}
