"use server";

import ROUTES from "@/config/routes";
import { Track, UpdateTrack } from "@/lib/db/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export default async function updateTrackAction(
  _: any,
  formData: FormData,
): Promise<{ success: boolean; error: string; result?: Track }> {
  const trackId = formData.get("trackId") as string;
  const field = formData.get("field") as string;
  let value = formData.get(field) as keyof UpdateTrack | number;

  if (value === "bpm") {
    value = parseInt(value as string);
  }

  const data: Partial<UpdateTrack> = { [field]: value };

  const result = await prisma.track.update({
    data,
    where: {
      id: trackId,
    },
  });

  revalidateTag("tracks");

  revalidatePath(ROUTES.dashboard, "layout");

  return { success: true, error: "", result };
}
