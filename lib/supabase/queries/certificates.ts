/**
 * Certificate/Course Database Queries
 *
 * This module re-exports functions from the course service layer
 * to maintain consistency with the project's query pattern while
 * preserving the service layer's business logic and type mapping.
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 13.1, 13.2, 13.3
 */

export {
  getAllCourses,
  getCourseBySlug,
  getCourseById,
  createCourse,
  updateCourse,
  softDeleteCourse,
  slugExists,
} from '@/features/certificates/services/course.service'
