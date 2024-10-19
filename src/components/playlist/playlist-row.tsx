"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import ROUTES from "@/config/routes";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { usePlaylist } from "@/hooks/use-playlist";
import { deletePlaylistAction } from "@/lib/actions";
import { PlaylistWithArtists } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Circle, Disc3, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

export default function PlaylistRow({
  playlist,
}: {
  playlist: PlaylistWithArtists;
}) {
  const { id, coverUrl, name, artists } = playlist;

  const { deletePlaylist } = usePlaylist();

  const { openDialog } = useAlertDialog();

  const pathname = usePathname();

  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onTableRowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openPlaylist();
  };

  const openPlaylist = useCallback(() => {
    router.push(`${ROUTES.playlist}/${id}`);
  }, [router, id]);

  const handleDeletePlaylist = async (id: string) => {
    deletePlaylist(id);

    if (pathname === `${ROUTES.playlist}/${id}`) {
      router.prefetch(ROUTES.dashboard);
      router.push(ROUTES.dashboard);
    }

    deletePlaylistAction(id);
    router.refresh();
  };

  const isActive = (id: string) =>
    useMemo(() => pathname === `${ROUTES.playlist}/${id}`, [pathname]);

  return (
    <TableRow
      onClick={onTableRowClick}
      className="group relative cursor-pointer border-muted border-b"
    >
      <TableCell className="absolute ml-0.5 flex h-full items-center justify-center">
        <span className={cn(isActive(id) ? "visible" : "hidden")}>
          <Circle className="h-2 w-2 fill-current" />
        </span>
      </TableCell>
      <TableCell className="pl-7">
        <div className="flex items-center space-x-4">
          <div className="relative size-10">
            <Avatar className="flex size-10 items-center justify-center space-y-0 rounded-md">
              <AvatarImage
                src={coverUrl!}
                alt={`${name} cover`}
                className="object-cover"
              />
              <AvatarFallback className="rounded-md">
                <Disc3 className="size-6" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="whitespace-nowrap font-medium">{name}</div>
            <div className="whitespace-nowrap text-muted-foreground text-sm">
              {artists}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell
        className={cn(
          "pr-3.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100",
          dropdownOpen ? "opacity-100" : "",
        )}
      >
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon className="size-4" />
              <span className="sr-only">Playlist options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  openPlaylist();
                }}
              >
                <Disc3 className="mr-2 size-3" />
                Open Playlist
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                openDialog({
                  title: "Delete from Your Library?",
                  description: (
                    <>
                      This will delete <strong>{name}</strong> playlist from
                      Your Library.
                    </>
                  ),
                  cancelLabel: "Cancel",
                  actionLabel: "Delete",
                  onAction: () => handleDeletePlaylist(id),
                });
              }}
            >
              <Trash className="mr-2 size-3" />
              Delete Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
