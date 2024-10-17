"use client";

import SidebarPlaylistItem from "@/components/playlist/sidebar-playlist-item";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ROUTES from "@/config/routes";
import { usePlaylist } from "@/hooks/use-playlist";
import { useUser } from "@/hooks/use-user";
import { createPlaylistAction } from "@/lib/actions";
import { Playlist } from "@/lib/db/types";
import { createId } from "@paralleldrive/cuid2";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarPlaylists() {
  const { user } = useUser();

  const { playlistsWithArtists, updatePlaylist } = usePlaylist();

  const router = useRouter();

  const addPlaylistAction = async () => {
    const newPlaylistId = createId();

    const newPlaylist: Playlist = {
      id: newPlaylistId,
      name: "Trancify Playlist",
      coverUrl: "",
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    updatePlaylist(newPlaylistId, newPlaylist);
    router.prefetch(`${ROUTES.playlist}/${newPlaylistId}`);
    router.push(`${ROUTES.playlist}/${newPlaylistId}`);
    createPlaylistAction(user.id, newPlaylistId, newPlaylist.name);
    router.refresh();
  };

  return (
    <section className="py-2">
      <div className="flex w-full items-center justify-between pr-4">
        <h2 className="relative px-7 font-semibold text-lg tracking-tight">
          Playlists
        </h2>
        <form action={addPlaylistAction}>
          <Button size="icon" variant="ghost" type="submit">
            <Plus className="size-5" />
            <span className="sr-only">Add new playlist</span>
          </Button>
        </form>
      </div>

      <ScrollArea className="h-[20rem] px-1">
        <ul className="space-y-1 p-2">
          {playlistsWithArtists?.map((playlist) => (
            <SidebarPlaylistItem key={playlist.id} playlist={playlist} />
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
}
