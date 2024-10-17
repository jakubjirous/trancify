"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CONSTRAINTS from "@/config/constraints";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { uploadPlaylistCoverAction } from "@/lib/actions";
import { cn } from "@/utils/cn";
import { Disc3, Loader2, Upload } from "lucide-react";
import React, { ChangeEvent, useActionState } from "react";

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

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size <= CONSTRAINTS.maxFileSize) {
        e.target.form?.requestSubmit();
      } else {
        openDialog({
          title: "Playlist cover too large",
          description: "The file size is too large. Maximum file size is 5MB.",
          actionLabel: "OK",
        });
        e.target.value = "";
      }
    }
  };

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
        tabIndex={0}
        className={cn(
          "translate-opacity absolute inset-0 rounded-md bg-muted/50 backdrop-blur duration-300 ",
          "opacity-0 focus-within:opacity-100 group-hover:opacity-100",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
            onChange={handleSubmit}
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
