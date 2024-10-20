"use client";
import { Button } from "@/components/ui/button";
import ROUTES from "@/config/routes";
import { usePlaylist } from "@/hooks/use-playlist";
import { createPlaylistAction } from "@/lib/actions";
import { Playlist } from "@/lib/db/types";
import { createId } from "@paralleldrive/cuid2";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export default function AddPlaylist({
  size = "full",
}: { size?: "icon" | "full" }) {
  const router = useRouter();

  const { updatePlaylist } = usePlaylist();

  const addPlaylistAction = async () => {
    const newPlaylistId = createId();

    const newPlaylist: Playlist = {
      id: newPlaylistId,
      name: "Trancify Playlist",
      coverUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      isLocal: true,
    };

    updatePlaylist(newPlaylistId, newPlaylist);
    router.prefetch(`${ROUTES.playlist}/${newPlaylistId}`);
    router.push(`${ROUTES.playlist}/${newPlaylistId}`);
    createPlaylistAction(newPlaylistId, newPlaylist.name);
    router.refresh();
  };

  return (
    <form action={addPlaylistAction}>
      {size === "icon" ? (
        <Button
          size={size}
          variant="ghost"
          type="submit"
          disabled={isProduction}
        >
          <Plus className="size-5" />
          <span className="sr-only">Add new playlist</span>
        </Button>
      ) : (
        <Button size="sm" disabled={isProduction}>
          <Plus className="mr-2 size-5" />
          Add new playlist
        </Button>
      )}
    </form>
  );
}
