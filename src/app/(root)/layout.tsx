import NowPlaying from "@/components/now-playing/now-playing";
import Player from "@/components/player/player";
import { Sidebar } from "@/components/sidebar/sidebar";
import ProtectedProviders from "@/providers/protected-providers";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedProviders>
      <div className="grid h-dvh grid-cols-[20rem,4fr] grid-rows-[1fr,8rem] overflow-clip text-foreground">
        <Sidebar />
        <main className="flex h-[calc(100dvh-8rem)] justify-between">
          <div className="w-full">{children}</div>
          <NowPlaying />
        </main>
        <Player />
      </div>
    </ProtectedProviders>
  );
}
