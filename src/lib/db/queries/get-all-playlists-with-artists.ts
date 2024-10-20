"use server";

import normalizeArtistName from "@/utils/normalize-artist-name";
import { PrismaClient } from "@prisma/client";
import { User } from "@supabase/auth-js";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const getAllPlaylistsWithArtists = unstable_cache(
  async () => {
    const playlists = await prisma.playlist.findMany({
      include: {
        tracks: {
          include: {
            track: {
              select: {
                id: true,
                artist: true,
                featuring: true,
              },
            },
          },
          take: 3,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return playlists.map((playlist) => {
      const artistsSet = new Set<string>();

      playlist.tracks.map(({ track }) => {
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
      };
    });
  },
  ["all-playlists-with-artists"],
  { tags: ["playlists"] },
);

export default getAllPlaylistsWithArtists;
