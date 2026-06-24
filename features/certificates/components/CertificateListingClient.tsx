'use client';

import { useMemo } from 'react';
import { Course } from '../types';
import { categorizeForDisplay } from '../services/validation.service';
import { CertificateHeader } from './CertificateHeader';
import { CertificateGrid } from './CertificateGrid';
import { CertificateActionBar } from './CertificateActionBar';

interface CertificateListingClientProps {
  courses: Course[];
  isAdmin?: boolean;
  secret?: string;
}

/**
 * CertificateListingClient
 *
 * Client-side assembler for the /certificate listing page.
 * Receives all courses from the server component, categorizes them,
 * then renders Header → AdminActionBar? → LearningGrid → CertificatesGrid.
 */
export const CertificateListingClient: React.FC<CertificateListingClientProps> = ({
  courses,
  isAdmin = false,
  secret = '',
}) => {
  // Sort courses: purely by issue_date descending (newest first)
  const sortedCourses = useMemo(() => {
    return [...courses].sort((a, b) => {
      const dateA = a.issue_date ? new Date(a.issue_date).getTime() : 0;
      const dateB = b.issue_date ? new Date(b.issue_date).getTime() : 0;
      const timeA = isNaN(dateA) ? 0 : dateA;
      const timeB = isNaN(dateB) ? 0 : dateB;
      return timeB - timeA;
    });
  }, [courses]);

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-340 py-24">
      {/* Page header */}
      <CertificateHeader totalCount={courses.length} />

      {/* Admin action bar — only visible to admins */}
      {isAdmin && secret && (
        <CertificateActionBar
          mode="listing"
          secret={secret}
          className="mb-16"
        />
      )}

      {/* Unified Learning & Certificate Archive section */}
      <CertificateGrid
        courses={sortedCourses}
        emptyMessage="No courses or certificates found"
        secret={isAdmin ? secret : undefined}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default CertificateListingClient;
