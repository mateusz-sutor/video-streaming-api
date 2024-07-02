import fs from 'fs';

import { VideoEntity } from '../../domain/entities';
import { VideosRepository } from '../../domain/repositories/videos';
import { UseCase } from '../abstract';

export interface GetVideoUseCaseParams {
  id: number;
}

export class GetVideoUseCase implements UseCase<VideoEntity> {
  constructor(private readonly repository: VideosRepository) {}

  public async execute({id}: GetVideoUseCaseParams): Promise<VideoEntity> {
    const entity = await this.repository.findById({id});

    if(!entity) throw new Error("Not found");

    entity.videoFiles?.forEach(file => {
      const videoPath = `./public/videos/${file.id}.mp4`;
        const stats = fs.statSync(videoPath);
        const fileSize = stats.size;

        file.bytesPerSecond = Math.floor(fileSize / entity.length);
    });

    return entity;
  }
}
