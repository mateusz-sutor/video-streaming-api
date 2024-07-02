import { Entity } from '../abstract';

export enum VideoQuality {
  _1080 = '1080',
  _720 = '720',
  _480 = '480',
  _360 = '360'
}

export class VideoFile extends Entity {
  quality!: VideoQuality;
  videoId!: number;
  bytesPerSecond?: number;
}
