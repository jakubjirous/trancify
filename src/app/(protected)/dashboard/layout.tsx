import Player from "@/components/player/player";
import { Sidebar } from "@/components/sidebar";
import ProtectedProviders from "@/providers/protected-providers";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedProviders>
      <div className="relative grid h-dvh grid-cols-[1fr,4fr] grid-rows-[1fr,8rem] overflow-clip text-foreground">
        <Sidebar />
        <main className="h-[calc(100dvh-8rem)]">{children}</main>
        <Player />

        <div className="-z-10 -rotate-12 absolute top-[-10vw] left-[-10vw] aspect-square w-[30vw] animate-spin-slow bg-gradient-to-br from-purple-900 to-background blur-[10vw] [--spin-duration:5s]"></div>
      </div>
    </ProtectedProviders>
  );
}
