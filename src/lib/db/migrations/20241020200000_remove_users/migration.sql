/*
  Warnings:

  - You are about to drop the column `userId` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TracksInPlaylists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "TracksInPlaylists" DROP COLUMN "userId";
