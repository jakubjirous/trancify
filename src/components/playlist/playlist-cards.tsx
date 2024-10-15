"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ROUTES from "@/config/routes";
import { usePlaylist } from "@/hooks/use-playlist";
import { cn } from "@/utils/cn";
import { Disc3, Play } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PlaylistCards({
  limit = Infinity,
  onIndex,
}: { limit?: number; onIndex?: boolean }) {
  const { playlistsWithArtists } = usePlaylist();

  return (
    <div
      className={cn(
        "grid gap-8 px-8",
        onIndex ? "grid-cols-2" : "grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3",
      )}
    >
      {playlistsWithArtists
        .slice(0, limit)
        .map(({ id, name, coverUrl, artists }) => (
          <Link
            key={id}
            href={`${ROUTES.playlist}/${id}`}
            className="group block"
          >
            <Card className="relative overflow-hidden rounded-md border-none bg-secondary">
              <CardContent className="flex items-center p-0">
                <Avatar
                  className={cn("rounded-md", onIndex ? "size-40" : "size-28")}
                >
                  <AvatarImage
                    src={coverUrl!}
                    alt={`${name} cover`}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-md">
                    <Disc3 className={cn(onIndex ? "size-32" : "size-28")} />
                  </AvatarFallback>
                </Avatar>

                <div className="w-full min-w-0 flex-grow pr-12 pl-6">
                  <h2
                    className={cn(
                      "truncate font-semibold",
                      onIndex ? "text-2xl" : "text-lg",
                    )}
                  >
                    {name}
                  </h2>
                  <p
                    className={cn(
                      "truncate text-muted-foreground",
                      onIndex ? "text-lg" : "text-md",
                    )}
                  >
                    {artists}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-end justify-end transition-all duration-300">
                  <Button
                    size="icon"
                    className="mr-4 mb-4 translate-y-full transform rounded-full bg-primary p-2 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Play className={cn(onIndex ? "size-6" : "size-4")} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  );
}
