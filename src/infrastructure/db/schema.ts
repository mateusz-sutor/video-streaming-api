import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// declaring enum in database
export const qualityEnum = pgEnum('quality', ['1080', '720', '480', '360']);

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  title: varchar('name', { length: 256 }),
  description: varchar('description', { length: 256 }),
  length: integer('length'),
});

export const videosFiles = pgTable('videosFiles', {
  id: serial('id').primaryKey(),
  quality:  qualityEnum('quality'),
  videoId: integer('video_id').references(() => videos.id),
});
