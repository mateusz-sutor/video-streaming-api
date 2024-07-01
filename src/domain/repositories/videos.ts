import { Repository } from '../abstract';
import { VideoEntity } from '../entities';

export abstract class VideosRepository extends Repository<VideoEntity> {
    abstract findById(params: Pick<VideoEntity, 'id'>): Promise<VideoEntity | null>;
    abstract findMany(): Promise<VideoEntity[]>;
}
