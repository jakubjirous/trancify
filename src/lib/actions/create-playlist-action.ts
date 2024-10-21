"use server";

import createPlaylist from "@/lib/db/mutations/create-playlist";

export default async function createPlaylistAction(
  playlistId: string,
  name: string,
) {
  if (process.env.VERCEL_ENV === "production") {
    return;
  }

  await createPlaylist(playlistId, name);
}
