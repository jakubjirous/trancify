-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "duration" INTEGER NOT NULL,
    "genre" TEXT,
    "bpm" INTEGER,
    "featuring" TEXT,
    "coverUrl" TEXT,
    "audioUrl" TEXT NOT NULL,
    "isLocal" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TracksInPlaylists" (
    "trackId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "TracksInPlaylists_pkey" PRIMARY KEY ("trackId","playlistId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Track_audioUrl_key" ON "Track"("audioUrl");

-- CreateIndex
CREATE INDEX "idx_tracks_name" ON "Track"("name");

-- CreateIndex
CREATE INDEX "idx_tracks_artist" ON "Track"("artist");

-- CreateIndex
CREATE INDEX "idx_tracks_album" ON "Track"("album");

-- CreateIndex
CREATE INDEX "idx_tracks_genre" ON "Track"("genre");

-- CreateIndex
CREATE INDEX "idx_tracks_bpm" ON "Track"("bpm");

-- CreateIndex
CREATE INDEX "idx_tracks_created_at" ON "Track"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_name_key" ON "Playlist"("name");

-- CreateIndex
CREATE INDEX "idx_playlists_name" ON "Playlist"("name");

-- CreateIndex
CREATE INDEX "idx_playlists_created_at" ON "Playlist"("createdAt");

-- CreateIndex
CREATE INDEX "idx_tracks_in_playlists_track_id" ON "TracksInPlaylists"("trackId");

-- CreateIndex
CREATE INDEX "idx_tracks_in_playlists_playlist_id" ON "TracksInPlaylists"("playlistId");

-- CreateIndex
CREATE INDEX "idx_tracks_in_playlists_order" ON "TracksInPlaylists"("order");

-- AddForeignKey
ALTER TABLE "TracksInPlaylists" ADD CONSTRAINT "TracksInPlaylists_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TracksInPlaylists" ADD CONSTRAINT "TracksInPlaylists_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
