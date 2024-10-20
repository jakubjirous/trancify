"use server";

import normalizeArtistName from "@/utils/normalize-artist-name";
import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { Playlist } from "../types";

const prisma = new PrismaClient();

const getPlaylistWithTracks = unstable_cache(
  async (playlistId: Playlist["id"]) => {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
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

    if (!playlist) return;

    const tracks = playlist.tracks?.map((trackInPlaylist) => ({
      ...trackInPlaylist.track,
      order: trackInPlaylist.order,
    }));

    const tracksCount = tracks.length;

    const duration = tracks.reduce((total, track) => total + track.duration, 0);

    const artistsSet = new Set<string>();

    playlist.tracks.splice(0, 3).map(({ track }) => {
      normalizeArtistName(track.artist).map((normalizedArtist) =>
        artistsSet.add(normalizedArtist),
      );
      if (track.featuring) {
        artistsSet.add(track.featuring);
      }
    });

    return {
      ...playlist,
      artists: [...artistsSet].join(", "),
      tracksCount,
      duration,
      tracks,
    };
  },
  ["playlist-with-tracks"],
  { tags: ["playlists", "tracks"] },
);

export default getPlaylistWithTracks;
