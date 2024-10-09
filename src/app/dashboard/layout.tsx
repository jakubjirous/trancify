import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr,auto] bg-background text-foreground md:h-full md:grid-cols-[1fr,3fr,1fr]">
      <aside className="flex flex-col border border-gray-500">Sidebar</aside>
      <main className="border border-gray-500">
        Playlist
        {/*{children}*/}
      </main>
      <aside className="border border-gray-500">Metadata</aside>
      <footer className="h-20 border border-gray-500 bg-background md:col-span-3">
        Player Controls
      </footer>
    </div>
  );
}
