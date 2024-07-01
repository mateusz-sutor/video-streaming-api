DO $$ BEGIN
 CREATE TYPE "public"."quality" AS ENUM('1080', '720', '480', '360');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" varchar(256),
	"length" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "videosFiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"quality" "quality",
	"video_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "videosFiles" ADD CONSTRAINT "videosFiles_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
