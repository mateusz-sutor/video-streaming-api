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

    return entity;
  }
}
