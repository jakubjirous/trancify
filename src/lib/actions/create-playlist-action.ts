"use server";

import createPlaylist from "@/lib/db/mutations/create-playlist";

export default async function createPlaylistAction(
  playlistId: string,
  name: string,
) {
  await createPlaylist(playlistId, name);
}
