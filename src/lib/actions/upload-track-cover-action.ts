"use server";

import ROUTES from "@/config/routes";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag } from "next/cache";

const prisma = new PrismaClient();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function uploadTrackCoverAction(
  _: any,
  formData: FormData,
) {
  const trackId = formData.get("trackId") as string;

  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  const filename = file.name;

  try {
    const { data: allFiles } = await supabase.storage
      .from("covers")
      .list(`tracks/${trackId}`);

    const filesToDelete = allFiles
      ? allFiles.map((file) => `tracks/${trackId}/${file.name}`)
      : [];

    await supabase.storage.from("covers").remove(filesToDelete);

    const { error: uploadError } = await supabase.storage
      .from("covers")
      .upload(`tracks/${trackId}/${filename}`, file, {
        upsert: true,
      });

    if (uploadError) {
      console.error("Cover upload failed:", uploadError);
    }

    const { data: coverData } = supabase.storage
      .from("covers")
      .getPublicUrl(`tracks/${trackId}/${filename}`);

    const coverUrl = coverData.publicUrl;

    await prisma.track.update({
      data: {
        coverUrl,
      },
      where: {
        id: trackId,
      },
    });

    revalidateTag("tracks");
    revalidatePath(ROUTES.root, "layout");

    return { success: true, trackId, coverUrl };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}
