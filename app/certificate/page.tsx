import { Metadata } from 'next';
import { CertificateListingClient } from '@/features/certificates/components/CertificateListingClient';
import { getAllCourses } from '@/features/certificates/services/course.service';
import { validateAdminSecret } from '@/features/projects/utils/timeline';
import { Course } from '@/features/certificates/types';

export const metadata: Metadata = {
  title: 'Learning & Certificates — Ardiansyah',
  description:
    'A curated archive of continuous learning: from active courses in progress to completed certificates, all verified and documented.',
};

// Revalidate every 60 seconds so new certificates appear without a full redeploy
export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ secret?: string }>;
}

export default async function CertificatePage({ searchParams }: PageProps) {
  const { secret = '' } = await searchParams;
  const isAdmin = validateAdminSecret(secret);

  // Fetch all courses directly from the database query layer
  let courses: Course[] = [];
  try {
    courses = await getAllCourses();
  } catch (error) {
    console.error('Error loading certificates on server component:', error);
    courses = [];
  }

  return (
    <main>
      <CertificateListingClient
        courses={courses}
        isAdmin={isAdmin}
        secret={secret}
      />
    </main>
  );
}
