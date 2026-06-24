/*
  Warnings:

  - You are about to drop the column `demo_url` on the `project_features` table. All the data in the column will be lost.
  - You are about to drop the column `tech_stack` on the `project_features` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project_feature_media" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "project_features" DROP COLUMN "demo_url",
DROP COLUMN "tech_stack",
ADD COLUMN     "short_description" VARCHAR(200),
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "project_media" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "timeline_entries" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
