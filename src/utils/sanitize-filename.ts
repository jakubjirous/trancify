/**
 * Sanitizes a filename by removing invalid characters and replacing spaces with hyphens.
 *
 * @param {string} filename - The input filename to be sanitized.
 * @returns {string} The sanitized filename.
 */
export default function sanitizeFilename(filename: string): string {
  const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();

  const nameWithoutExtension = filename.slice(0, filename.lastIndexOf("."));

  const isSanitized = /^[a-z0-9\-]+$/.test(nameWithoutExtension);

  if (isSanitized) {
    return filename;
  }

  const sanitizedName = nameWithoutExtension
    .toLowerCase()
    .replace(/[_&'()]/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return `${sanitizedName}${extension}`;
}
