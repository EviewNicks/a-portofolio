import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCourseBySlug, getAllCourses } from '@/features/certificates/services/course.service';
import { validateAdminSecret } from '@/features/projects/utils/timeline';
import { CertificateDetailClient } from '@/features/certificates/components/CertificateDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ secret?: string }>;
}

export async function generateStaticParams() {
  try {
    const courses = await getAllCourses();
    return courses.map((c) => ({ slug: c.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  
  if (!course) {
    return {
      title: 'Certificate Not Found',
    };
  }

  return {
    title: `${course.name} — Certificate`,
    description: course.description || `${course.name} issued by ${course.organisation}.`,
  };
}

export default async function CertificateDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { secret = '' } = await searchParams;
  const isAdmin = validateAdminSecret(secret);

  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <main>
      <CertificateDetailClient
        course={course}
        isAdmin={isAdmin}
        secret={secret}
      />
    </main>
  );
}
