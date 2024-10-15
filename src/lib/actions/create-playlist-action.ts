"use server";

import createPlaylist from "@/lib/db/mutations/create-playlist";

export default async function createPlaylistAction(
  userId: string,
  playlistId: string,
  name: string,
) {
  await createPlaylist(userId, playlistId, name);
}
