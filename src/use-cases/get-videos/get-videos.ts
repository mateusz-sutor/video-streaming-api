import { VideoEntity } from '../../domain/entities';
import { VideosRepository } from '../../domain/repositories/videos';
import { UseCase } from '../abstract';

export class GetVideosUseCase implements UseCase<VideoEntity[]> {
  constructor(private readonly repository: VideosRepository) {}

  public async execute(): Promise<VideoEntity[]> {
    const entities = await this.repository.findMany();
    return entities;
  }
}
