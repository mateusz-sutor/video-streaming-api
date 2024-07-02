import { Entity } from '../abstract';
import { VideoFile } from './video-file';

export class VideoEntity extends Entity {
  title!: string;
  description!: string;
  length!: number;   // in seconds
  videoFiles?: VideoFile[];
}
