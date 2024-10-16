"use server";

import ROUTES from "@/config/routes";
import getFileTypeFromFilename from "@/utils/get-file-type-from-filename";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag } from "next/cache";

const prisma = new PrismaClient();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function uploadPlaylistCoverAction(
  _: any,
  formData: FormData,
) {
  const playlistId = formData.get("playlistId") as string;

  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  const fileType = getFileTypeFromFilename(file.name);

  try {
    const { error: uploadError } = await supabase.storage
      .from("covers")
      .upload(`playlists/${playlistId}.${fileType}`, file, {
        upsert: true,
      });

    if (uploadError) {
      console.error("Cover upload failed:", uploadError);
    }

    const { data: coverData } = supabase.storage
      .from("covers")
      .getPublicUrl(`playlists/${playlistId}.${fileType}`);

    const coverUrl = coverData.publicUrl;

    await prisma.playlist.update({
      data: {
        coverUrl,
      },
      where: {
        id: playlistId,
      },
    });

    revalidateTag("playlists");
    revalidatePath(`${ROUTES.playlist}/${playlistId}`);

    return { success: true, coverUrl };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}
