/**
 * Get the file type from filename
 * @param filename
 */
export default function getFileTypeFromFilename(
  filename: string,
): string | null {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop() || null : null;
}
