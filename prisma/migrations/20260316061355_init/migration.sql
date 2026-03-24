-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('active', 'maintenance', 'archived');

-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('pr', 'milestone', 'blog_post', 'video', 'deployment', 'release');

-- CreateEnum
CREATE TYPE "PRStatus" AS ENUM ('merged', 'closed', 'open');

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT,
    "tech_stack" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "ProjectStatus" NOT NULL DEFAULT 'active',
    "github_repo_url" TEXT,
    "github_owner" TEXT,
    "github_repo" TEXT,
    "last_sync_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_entries" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "project_id" TEXT NOT NULL,
    "entry_type" "EntryType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sprint_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "external_url" TEXT,
    "external_title" TEXT,
    "external_status" "PRStatus",
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "media_preview" TEXT,
    "github_pr_number" INTEGER,
    "github_pr_title" TEXT,
    "github_author" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_media" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "project_id" TEXT NOT NULL,
    "storage_path" TEXT NOT NULL,
    "public_url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_github_repo_url_key" ON "projects"("github_repo_url");

-- CreateIndex
CREATE INDEX "projects_status_idx" ON "projects"("status");

-- CreateIndex
CREATE INDEX "projects_github_owner_github_repo_idx" ON "projects"("github_owner", "github_repo");

-- CreateIndex
CREATE INDEX "timeline_entries_project_id_date_idx" ON "timeline_entries"("project_id", "date" DESC);

-- CreateIndex
CREATE INDEX "timeline_entries_project_id_sprint_number_idx" ON "timeline_entries"("project_id", "sprint_number");

-- CreateIndex
CREATE UNIQUE INDEX "timeline_entries_project_id_github_pr_number_key" ON "timeline_entries"("project_id", "github_pr_number");

-- CreateIndex
CREATE INDEX "project_media_project_id_idx" ON "project_media"("project_id");

-- AddForeignKey
ALTER TABLE "timeline_entries" ADD CONSTRAINT "timeline_entries_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_media" ADD CONSTRAINT "project_media_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
