import { Prisma } from "@prisma/client";

export type Track = Prisma.TrackGetPayload<{}>;
export type UpdateTrack = Prisma.TrackUpdateInput;

export type Playlist = Prisma.PlaylistGetPayload<{}>;

export type PlaylistWithTracks = Playlist & {
  artists: string;
  tracks: (Track & { order: number })[];
  tracksCount: number;
  duration: number;
};

export type PlaylistWithArtists = Playlist & {
  artists: string;
};
