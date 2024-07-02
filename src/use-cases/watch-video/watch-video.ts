import fs from 'fs';

import { VideoQuality } from '../../domain/entities/video-file';
import { VideosRepository } from '../../domain/repositories/videos';
import { UseCase } from '../abstract';

export interface WatchVideoUseCaseParams {
  id: number;
  resolution: VideoQuality;
}

export interface WatchVideoUseCaseResponse {
  videoPath: string;
  streamLength: number;
  dataToRead: number;
}

export class WatchVideoUseCase implements UseCase<WatchVideoUseCaseResponse> {
  constructor(private readonly repository: VideosRepository) {}

  public async execute({id, resolution}: WatchVideoUseCaseParams): Promise<WatchVideoUseCaseResponse> {
    const entity = await this.repository.findById({id});

    if(!entity) throw new Error("Not found");

    const videoFile = entity.videoFiles?.find(videoFile => {
      return String(videoFile.quality) === String(resolution)
    });

    if(!videoFile) throw new Error("Not found");

    const videoPath = `./public/videos/${videoFile.id}.mp4`;
    const stats = fs.statSync(videoPath);
    const streamLength = Math.floor((stats.size / entity.length) * 10);
    const dataToRead = Math.floor(stats.size);

    return {
      videoPath,
      streamLength,
      dataToRead,
    }
  }
}
