"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";
import { signOutAction } from "@/lib/supabase/actions";
import { CircleUser } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export default function UserNav() {
  const { user } = useUser();

  const [isPending, startTransition] = useTransition();

  const [mounted, setMounted] = useState(false);

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {user?.user_metadata?.avatar_url ? (
            <Avatar className="size-10">
              <AvatarImage
                src={user?.user_metadata?.avatar_url}
                alt={user?.user_metadata?.email}
                className="object-cover"
              />
              <AvatarFallback>
                <CircleUser className="size-4 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <>
              <CircleUser className="size-4 text-muted-foreground" />
              <span className="sr-only">Toggle user menu</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">
              {user?.user_metadata?.name ?? user?.email}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.user_metadata?.email ?? user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isPending}>
          {isPending ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
