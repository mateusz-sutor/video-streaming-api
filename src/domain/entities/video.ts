import { Entity } from '../abstract';

export class VideoEntity extends Entity {
  title!: string;
  description!: string;
  length!: number;   // in seconds
}
