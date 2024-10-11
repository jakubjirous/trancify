import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProtectedProviders from "@/providers/protected-providers";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedProviders>
      <div className="grid h-dvh grid-cols-[1fr,4fr] grid-rows-[1fr,6rem] bg-background text-foreground">
        <Sidebar />

        <main className="flex h-[calc(100dvh-6rem)] justify-between overflow-hidden">
          <ScrollArea className="h-[calc(100dvh-6rem)]">
            {children}

            {/*  /!*<aside className="basis-1/3 border border-gray-500">Metadata</aside>*!/*/}
          </ScrollArea>
        </main>
        <footer className="h-[6rem] w-full border-t border-t-foreground/10 bg-background md:col-span-2">
          Player Controls
        </footer>
      </div>
    </ProtectedProviders>
  );
}
