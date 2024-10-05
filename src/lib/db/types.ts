import { Prisma } from "@prisma/client";

export type Track = Prisma.TrackGetPayload<{}>;
export type NewTrack = Prisma.TrackCreateInput;

export type Playlist = Prisma.PlaylistGetPayload<{}>;
export type NewPlaylist = Prisma.PlaylistCreateInput;

export type TracksInPlaylists = Prisma.TracksInPlaylistsGetPayload<{}>;
export type NewTracksInPlaylists = Prisma.TracksInPlaylistsCreateInput;

export type PlaylistWithTracks = Playlist & {
  tracks: (Track & { order: number })[];
  trackCount: number;
  duration: number;
};