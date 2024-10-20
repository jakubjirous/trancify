/**
 * Highlight text based on term
 * @param text
 * @param term
 */
export default function highlightText(text: string, term?: string) {
  if (!term) return text;

  const parts = text.split(new RegExp(`(${term})`, "gi"));

  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={i} className="bg-primary text-white">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
