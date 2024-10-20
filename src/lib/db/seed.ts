import path from "path";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs/promises";
import { parseBuffer } from "music-metadata";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const prisma = new PrismaClient();

const TRACKS_DIR = path.join(process.cwd(), "tracks");

async function seed() {
  console.log("Starting seed process...");
  await sanitizeTracks();
  await seedTracks();
  await seedPlaylists();
  console.log("Seed process completed successfully.");
}

async function sanitizeTracks() {
  const files = await fs.readdir(TRACKS_DIR);

  files.forEach((file) => {
    const oldPath = path.join(TRACKS_DIR, file);
    const newFileName = file
      .toLocaleLowerCase()
      .replace(/ /g, "_")
      .replace(/[^(\w|\/|!|-|\.|\*|'|\(|\)| |&|\$|@|=|;|:|\+|,|\?)]/g, "_");

    const newPath = path.join(TRACKS_DIR, newFileName);
    fs.rename(oldPath, newPath);
  });
}

async function seedTracks() {
  let files = await fs.readdir(TRACKS_DIR);

  for (let file of files.filter(
    (file) => path.extname(file).toLocaleLowerCase() === ".mp3",
  )) {
    let filePath = path.join(TRACKS_DIR, file);
    let buffer = await fs.readFile(filePath);
    let metadata = await parseBuffer(buffer, { mimeType: "audio/mpeg" });

    if (metadata.common.picture && metadata.common.picture.length > 0) {
      let metaPicture = metadata.common.picture[0];

      let coverBuffer = Buffer.from(metaPicture.data);

      let coverExt = metaPicture.format.split("/")[1]; // png
      let coverFilename = `${path.basename(file, path.extname(file))}.${coverExt}`;

      let { error: uploadError } = await supabase.storage
        .from("covers")
        .upload(`tracks/${coverFilename}`, coverBuffer, {
          contentType: metaPicture.format || "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.error("Cover upload failed:", uploadError);
      }

      const { data: coverData } = supabase.storage
        .from("covers")
        .getPublicUrl(`tracks/${coverFilename}`);

      let coverUrl = coverData.publicUrl;

      let { error: audioError } = await supabase.storage
        .from("tracks")
        .upload(`audio/${file}`, buffer, {
          contentType: "audio/mpeg",
          upsert: true,
        });

      if (audioError) {
        console.error("Audio upload failed:", audioError);
      }

      const { data: audioData } = supabase.storage
        .from("tracks")
        .getPublicUrl(`audio/${file}`);

      let audioUrl = audioData.publicUrl;

      let trackData = {
        name: metadata.common.title || path.parse(file).name,
        artist: metadata.common.artist || "Unknown Artist",
        album: metadata.common.album || "Unknown Album",
        duration: Math.round(metadata.format.duration || 0),
        genre: metadata.common.genre?.[0] || "Unknown Genre",
        bpm: metadata.common.bpm ? Math.round(metadata.common.bpm) : null,
        coverUrl,
        audioUrl,
        isLocal: true, // TODO:  (Jakub Jirous 2024-10-20 12:56:49)
      };

      await prisma.track.upsert({
        where: {
          audioUrl: trackData.audioUrl,
        },
        update: {
          ...trackData,
        },
        create: {
          ...trackData,
        },
      });

      const upsertTrack = await prisma.track.upsert({
        where: {
          audioUrl: trackData.audioUrl,
        },
        update: {
          ...trackData,
        },
        create: {
          ...trackData,
        },
      });

      console.log("upsertTrack", upsertTrack);
    }
  }
}

async function seedPlaylists() {
  const playlistsTemp = [
    {
      name: "A State Of Trance",
      coverUrl:
        "https://randomwordgenerator.com/img/picture-generator/55e9d7444c5aa914f1dc8460962e33791c3ad6e04e5074417c2d78d19e44cd_640.jpg",
    },
    {
      name: "Trance Around the World",
      coverUrl:
        "https://randomwordgenerator.com/img/picture-generator/5fe1d546434faa0df7c5d57bc32f3e7b1d3ac3e4565871497c2d72d296_640.jpg",
    },
    {
      name: "Global DJ Broadcast",
      coverUrl:
        "https://randomwordgenerator.com/img/picture-generator/57e5d3454b53ac14f1dc8460962e33791c3ad6e04e507440752f72d79448c4_640.jpg",
    },
    {
      name: "The Gareth Emery Podcast",
      coverUrl:
        "https://randomwordgenerator.com/img/picture-generator/52e0d34a4f55b10ff3d8992cc12c30771037dbf85254794e73287adc914e_640.jpg",
    },
  ];

  for (let { name, coverUrl } of playlistsTemp) {
    const playlist = await prisma.playlist.upsert({
      // @ts-ignore
      where: {
        name: name,
      },
      update: {},
      create: {
        name,
        coverUrl,
      },
    });

    // add random tracks to the playlist
    const allTracks = await prisma.track.findMany();
    const playlistTracksCount = Math.floor(Math.random() * 2) + 6; // 2 to 8 tracks
    const shuffledTracks = allTracks.sort(() => 0.5 - Math.random());

    // remove existing playlist tracks
    await prisma.tracksInPlaylists.deleteMany({
      where: {
        playlistId: playlist.id,
      },
    });

    // add new tracks to the playlist
    const data = shuffledTracks
      .slice(0, playlistTracksCount)
      .map((track, index) => ({
        trackId: track.id,
        playlistId: playlist.id,
        order: index,
      }));

    await prisma.tracksInPlaylists.createMany({
      data,
      skipDuplicates: true,
    });

    console.log(`Added ${playlistTracksCount} tracks to playlist: ${name}`);
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed process failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });
