import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log('Starting seed process...');

  console.log('Seed process completed successfully.');
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error('Seed process failed:', error);
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    console.log('Seed process finished. Exiting...');
    process.exit(0)
  })
