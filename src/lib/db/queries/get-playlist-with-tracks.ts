"use server";

import { PrismaClient } from "@prisma/client";
import { User } from "@supabase/auth-js";
import { unstable_cache } from "next/cache";
import { Playlist } from "../types";

const prisma = new PrismaClient();

const getPlaylistWithTracks = unstable_cache(
  async (user: User, playlistId: Playlist["id"]) => {
    const result = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
        userId: user.id,
      },
      include: {
        tracks: {
          include: {
            track: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!result) return;

    const tracks = result.tracks.map((trackInPlaylist) => ({
      ...trackInPlaylist,
      order: trackInPlaylist.order,
    }));

    const tracksCount = tracks.length;

    const duration = tracks.reduce(
      (total, { track }) => total + track.duration,
      0,
    );

    return {
      ...result,
      tracks,
      tracksCount,
      duration,
    };
  },
  ["playlist-with-tracks"],
  { tags: ["playlists", "tracks"] },
);

export default getPlaylistWithTracks;
