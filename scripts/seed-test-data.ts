/**
 * Seed script: inserts test data into Supabase dev DB for Playwright E2E tests.
 * Idempotent — uses upsert by title so it's safe to run multiple times.
 *
 * Usage: npx ts-node --project tsconfig.json -e "require('./scripts/seed-test-data.ts')"
 * Or add to package.json: "seed": "ts-node scripts/seed-test-data.ts"
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter } as never);

async function main() {
  console.log('🌱 Seeding test data...');

  // Project 1 — with GitHub repo
  const project1 = await prisma.project.upsert({
    where: { title: '[TEST] Portfolio Website' } as never,
    update: {},
    create: {
      title: '[TEST] Portfolio Website',
      short_description: 'A personal portfolio built with Next.js and Tailwind CSS.',
      long_description: 'Full-stack portfolio with dynamic project timeline, admin dashboard, and GitHub integration.',
      tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Supabase'],
      status: 'active',
      github_repo_url: 'https://github.com/vercel/next.js',
      github_owner: 'vercel',
      github_repo: 'next.js',
    } as never,
  });

  console.log(`✅ Project 1: ${project1.id} — ${project1.title}`);

  // Timeline entries for project 1
  await prisma.timelineEntry.createMany({
    data: [
      {
        project_id: project1.id,
        entry_type: 'milestone',
        title: 'Project kickoff',
        description: 'Initial setup and planning.',
        date: new Date('2025-01-10'),
        sprint_number: 1,
        is_featured: true,
      },
      {
        project_id: project1.id,
        entry_type: 'pr',
        title: 'Add homepage layout',
        description: 'Implemented responsive homepage with hero section.',
        date: new Date('2025-01-15'),
        sprint_number: 1,
        external_url: 'https://github.com/vercel/next.js/pull/1',
        github_pr_number: 1,
        github_pr_title: 'Add homepage layout',
        github_author: 'testuser',
        external_status: 'merged',
        is_featured: false,
      },
      {
        project_id: project1.id,
        entry_type: 'milestone',
        title: 'Sprint 2 start',
        description: 'Admin dashboard implementation begins.',
        date: new Date('2025-01-20'),
        sprint_number: 2,
        is_featured: false,
      },
    ],
    skipDuplicates: true,
  } as never);

  console.log('✅ Timeline entries for project 1 created');

  // Project 2 — no GitHub repo
  const project2 = await prisma.project.upsert({
    where: { title: '[TEST] Mobile App' } as never,
    update: {},
    create: {
      title: '[TEST] Mobile App',
      short_description: 'Cross-platform mobile app built with React Native.',
      long_description: 'A mobile application for task management with offline support.',
      tech_stack: ['React Native', 'TypeScript', 'Expo'],
      status: 'completed',
    } as never,
  });

  console.log(`✅ Project 2: ${project2.id} — ${project2.title}`);

  await prisma.timelineEntry.createMany({
    data: [
      {
        project_id: project2.id,
        entry_type: 'milestone',
        title: 'App store submission',
        description: 'Submitted to App Store and Google Play.',
        date: new Date('2025-02-01'),
        sprint_number: 3,
        is_featured: true,
      },
    ],
    skipDuplicates: true,
  } as never);

  console.log('✅ Timeline entries for project 2 created');
  console.log('\n🎉 Seed complete. Project IDs:');
  console.log(`   Project 1: ${project1.id}`);
  console.log(`   Project 2: ${project2.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
