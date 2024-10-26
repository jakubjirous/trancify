import NowPlaying from "@/components/now-playing/now-playing";
import Player from "@/components/player/player";
import { Sidebar } from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-dvh w-full grid-cols-1 grid-rows-[1fr,8rem] overflow-clip text-foreground md:grid-cols-[20rem,4fr] 2xl:grid-cols-[24rem,4fr]">
      <Sidebar />
      <main className="flex h-[calc(100dvh-8rem)] justify-between">
        <div className="w-full">{children}</div>
        <NowPlaying />
      </main>
      <Player />
    </div>
  );
}
