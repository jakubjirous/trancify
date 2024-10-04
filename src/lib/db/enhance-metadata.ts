import { google } from "@ai-sdk/google";
import { PrismaClient } from "@prisma/client";
import { generateObject } from "ai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const prisma = new PrismaClient();

async function cleanup() {
  console.log("Starting metadata cleanup process...");

  const allTracks = await prisma.track.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  for (let track of allTracks) {
    console.log(`Processing track: ${track.name}`);

    try {
      const result = await generateObject({
        model: google("gemini-1.5-flash", {
          structuredOutputs: false,
        }),
        schema: z.object({
          cleanTitle: z.string(),
          mainArtist: z.string(),
          featuringArtists: z.array(z.string()).nullable(),
          album: z.string(),
          genre: z.string(),
          bpm: z.number().nullable(),
        }),
        prompt: `
          As an AI assistant specializing in music metadata, clean up and enhance the following song information:

          Title: ${track.name}
          Artist: ${track.artist}
          Album: ${track.album}
          Genre: ${track.genre}
          BPM: ${track.bpm}

          Provide:
          1. A cleaned-up version of the title, removing any unnecessary information (e.g., featuring artists, version info).
          2. The main artist(s) of the track.
          3. Any featuring artists, if applicable (as an array of strings, or null if none).
          4. The correct album name, if you can determine it. Replace Unknown Album to the correct one.
          5. A more specific genre, if possible.
          6. Determine the proper value for tempo and count Beats Per Minute (BPM)
          7. Don't remove (Remix) in the title, if applicable.

          If you're unsure about any information, keep the original data. If unknown genre, do Trance or Progressive.
        `,
      });

      const cleanedMetadata = result.object;

      const updatedTrack = {
        name: cleanedMetadata.cleanTitle || track.name,
        artist: cleanedMetadata.mainArtist || track.artist,
        album: cleanedMetadata.album || track.album,
        genre: cleanedMetadata.genre || track.genre,
        bpm: cleanedMetadata.bpm || track.bpm,
        featuring: cleanedMetadata.featuringArtists
          ? cleanedMetadata.featuringArtists.join(", ")
          : null,
      };

      console.log("updatedTrack", updatedTrack);

      await prisma.track.update({
        where: {
          id: track.id,
        },
        data: {
          ...updatedTrack,
        },
      });

      console.log(`Updated metadata for song: ${updatedTrack.name}`);
    } catch (error) {
      console.error(`Error processing track ${track.name}:`, error);
    }
  }

  console.log("Metadata cleanup process completed successfully.");
}

cleanup()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Metadata cleanup process failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    console.log("Metadata cleanup process finished. Exiting...");
    process.exit(0);
  });
