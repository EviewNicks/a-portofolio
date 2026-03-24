// Projects Feature Module
export { ProjectsSection } from './components';
export type {
  ProjectsData,
  Project,
  ProjectImage,
  ProjectLink,
  ProjectFilters,
  ProjectStats,
} from '@/lib/types/portfolio';

// Dynamic project timeline exports
export type {
  DynamicProject,
  TimelineEntry,
  SprintGroup,
  GitHubStats,
  YouTubePreview,
  ProjectMedia,
  ValidationResult,
  GitHubPRData,
  ProjectStatus,
  EntryType,
  PRStatus,
  CreateProjectInput,
  UpdateProjectInput,
  CreateTimelineEntryInput,
  UpdateTimelineEntryInput,
} from './types';
export { groupEntriesBySprint, validateProjectInput, validateTimelineEntryInput, validateAdminSecret } from './utils/timeline';
export { extractGitHubOwnerRepo, fetchGitHubPRs, fetchGitHubStats } from './services/github/api';
export { extractYouTubeVideoId, fetchYouTubeMetadata } from './services/youtube/api';