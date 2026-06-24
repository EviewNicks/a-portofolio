export function buildFeatureMediaPath(featureId: string, filename: string): string {
  // Sanitize filename to prevent path traversal
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `feature-media/${featureId}/${sanitized}`;
}

export function getFeatureMediaBucket(): string {
  return 'public'; // Use public bucket for feature media
}
