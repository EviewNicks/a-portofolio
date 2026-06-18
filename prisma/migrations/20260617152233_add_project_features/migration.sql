-- AlterTable
ALTER TABLE "project_media" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "timeline_entries" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- CreateTable
CREATE TABLE "project_features" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "project_id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "youtube_url" VARCHAR(2048),
    "tech_stack" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "demo_url" VARCHAR(2048),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_feature_media" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "feature_id" TEXT NOT NULL,
    "storage_path" VARCHAR(1024) NOT NULL,
    "public_url" VARCHAR(2048) NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_feature_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_features_project_id_display_order_idx" ON "project_features"("project_id", "display_order");

-- CreateIndex
CREATE INDEX "project_feature_media_feature_id_display_order_idx" ON "project_feature_media"("feature_id", "display_order");

-- AddForeignKey
ALTER TABLE "project_features" ADD CONSTRAINT "project_features_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_feature_media" ADD CONSTRAINT "project_feature_media_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "project_features"("id") ON DELETE CASCADE ON UPDATE CASCADE;
