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
import KEY from "@/config/keys";
import ROUTES from "@/config/routes";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { usePlaylist } from "@/hooks/use-playlist";
import { deletePlaylistAction } from "@/lib/actions";
import { PlaylistWithArtists } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Disc3, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export default function PlaylistRow({
  playlist,
  onSelect,
  isSelected,
}: {
  playlist: PlaylistWithArtists;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { id, coverUrl, name, artists } = playlist;

  const { deletePlaylist } = usePlaylist();

  const { setActivePanel, handleKeyNavigation } = useKeyboardNavigation();

  const { openDialog } = useAlertDialog();

  const pathname = usePathname();

  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onClickTableRow = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePanel("sidebar");
    onSelect();
    openPlaylist();
  };

  const onKeyDownTableRow = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === KEY.Enter || e.key === KEY.Space) {
      e.preventDefault();
      onSelect();
      openPlaylist();
    } else {
      handleKeyNavigation(e, "sidebar");
    }
  };

  const openPlaylist = useCallback(() => {
    router.push(`${ROUTES.playlist}/${id}`);
  }, [router, id]);

  const handleDeletePlaylist = async (id: string) => {
    deletePlaylist(id);

    if (pathname === `${ROUTES.playlist}/${id}`) {
      router.prefetch(ROUTES.root);
      router.push(ROUTES.root);
    }

    deletePlaylistAction(id);
    router.refresh();
  };

  const isActive = pathname === `${ROUTES.playlist}/${id}`;

  return (
    <TableRow
      tabIndex={0}
      onClick={onClickTableRow}
      onKeyDown={onKeyDownTableRow}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "group relative w-full cursor-pointer border-muted border-b",
        "select-none outline-none",
        isActive ? "bg-primary/10 dark:bg-primary/30" : "",
        isSelected || isFocused ? "border-b-transparent" : "",
      )}
    >
      <TableCell className="w-full pl-7">
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
            <div className="truncate whitespace-nowrap font-medium">{name}</div>
            <div className="truncate whitespace-nowrap text-muted-foreground text-sm">
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
              disabled={isProduction}
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
      {(isSelected || isFocused) && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 border",
            isFocused ? "border-primary" : "",
          )}
        />
      )}
    </TableRow>
  );
}
