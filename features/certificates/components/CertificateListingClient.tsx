'use client';

import { useMemo, useState, useCallback } from 'react';
import { Course } from '../types';
import { CertificateHeader } from './CertificateHeader';
import { CertificateGrid } from './CertificateGrid';
import { CertificateActionBar } from './CertificateActionBar';
import { CertificateModal } from './CertificateModal';

interface CertificateListingClientProps {
  courses: Course[];
  isAdmin?: boolean;
  secret?: string;
}

/**
 * CertificateListingClient
 *
 * Client-side assembler for the /certificate listing page.
 * Owns the modal state — clicking any card opens CertificateModal
 * instead of navigating to the detail page.
 */
export const CertificateListingClient: React.FC<CertificateListingClientProps> = ({
  courses,
  isAdmin = false,
  secret = '',
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const handleOpen = useCallback((course: Course) => {
    const idx = sortedCourses.findIndex((c) => c.id === course.id);
    setSelectedIndex(idx >= 0 ? idx : 0);
    setSelectedCourse(course);
  }, [sortedCourses]);

  const handleClose = useCallback(() => {
    setSelectedCourse(null);
  }, []);

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
        onOpen={handleOpen}
      />

      {/* Certificate detail modal */}
      <CertificateModal
        isOpen={Boolean(selectedCourse)}
        course={selectedCourse}
        certIndex={selectedIndex}
        onClose={handleClose}
        isAdmin={isAdmin}
        secret={secret}
      />
    </div>
  );
};

export default CertificateListingClient;
