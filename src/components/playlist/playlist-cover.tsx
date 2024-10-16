"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { uploadPlaylistCoverAction } from "@/lib/actions";
import { cn } from "@/utils/cn";
import { Disc3, Loader2, Upload } from "lucide-react";
import React, { useActionState } from "react";

export default function PlaylistCover({
  playlistId,
  coverUrl,
}: { playlistId: string; coverUrl: string | null }) {
  const { openDialog } = useAlertDialog();

  const [state, formAction, pending] = useActionState(
    uploadPlaylistCoverAction,
    {
      success: false,
      coverUrl: "",
    },
  );

  const currentCoverUrl = state.success ? state.coverUrl : coverUrl;

  return (
    <div className="group relative rounded-md">
      <Avatar className="size-40 rounded-md object-cover">
        <AvatarImage
          src={currentCoverUrl!}
          alt="Playlist cover"
          className="object-cover"
        />
        <AvatarFallback className="rounded-md">
          <Disc3 className="size-28" />
        </AvatarFallback>
      </Avatar>

      <form
        action={formAction}
        className={cn(
          "translate-opacity absolute inset-0 rounded-md bg-muted/50 opacity-0 backdrop-blur duration-300 group-hover:opacity-100",
          pending ? "opacity-100" : "",
        )}
      >
        <input type="hidden" name="playlistId" value={playlistId} />
        <label
          htmlFor="coverInput"
          className="group flex size-40 cursor-pointer flex-col items-center justify-center"
        >
          <input
            id="coverInput"
            type="file"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              console.log("file", file);

              if (file) {
                if (file.size <= 1 * 1024 * 1024) {
                  e.target.form?.requestSubmit();
                } else {
                  alert("File size exceeds 1 MB limit");
                  e.target.value = "";
                }
              }
            }}
          />
          {pending ? (
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="size-8" />
              <span className="text-xs">Upload</span>
            </div>
          )}
        </label>
      </form>
    </div>
  );
}
