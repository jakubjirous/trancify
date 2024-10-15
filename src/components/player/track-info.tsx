"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePlayer } from "@/hooks/use-player";
import { Disc3 } from "lucide-react";

export default function TrackInfo() {
  const { currentTrack } = usePlayer();

  return (
    <div className="flex items-center space-x-4">
      {currentTrack && (
        <>
          <Avatar className="flex aspect-square h-16 w-16 items-center justify-center rounded-md">
            <AvatarImage
              src={currentTrack.coverUrl!}
              alt={`${currentTrack.name} cover`}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md">
              <Disc3 className="aspect-square w-16" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="">{currentTrack.name}</h3>
            <p className="text-muted-foreground text-sm">
              {currentTrack.artist}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
