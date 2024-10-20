/**
 * Normalize artist name
 * @param name
 */
export default function normalizeArtistName(name: string): string[] {
  const conjunctions = ["and", "feat", "feat.", "with", "vs", "vs."];

  const artistNames = name
    .split(new RegExp(`\\s(${conjunctions.join("|")})\\s`))
    .filter((artistName) => !conjunctions.includes(artistName.toLowerCase()));

  return artistNames.map((artistName) => {
    const sanitizedName = artistName.replace(/[^a-zA-Z0-9 ]/g, "");
    const words = sanitizedName.split(/\s+/);
    return words.join(" ");
  });
}
