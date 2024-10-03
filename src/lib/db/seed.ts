import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();

const TRACKS_FOLDER = "tracks";

async function seed() {
  console.log("Starting seed process...");
  await seedTracks();
  console.log("Seed process completed successfully.");
}

async function seedTracks() {
  let tracksDir = path.join(process.cwd(), "tracks");
  let files = await fs.readdir(tracksDir);
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
