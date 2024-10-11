import { getAllTracks } from "@/lib/db/queries";

export default async function TracksPage() {
  const tracks = await getAllTracks();

  return (
    <div>
      <pre>{JSON.stringify(tracks, null, 2)}</pre>
    </div>
  );
}
