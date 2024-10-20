"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music } from "lucide-react";

export default function TrancifyLogo() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full bg-primary shadow-lg">
      <Avatar className="aspect-square size-20 rounded-full">
        <AvatarImage
          src="/assets/logo.webp"
          alt="Trancify logo"
          className="object-cover"
        />
        <AvatarFallback className="rounded-md object-cover">
          <Music className="size-10 text-primary-foreground" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
