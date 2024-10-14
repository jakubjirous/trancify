import { Sidebar } from "@/components/sidebar";
import ProtectedProviders from "@/providers/protected-providers";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedProviders>
      <div className="relative grid h-dvh grid-cols-[1fr,4fr] grid-rows-[1fr,6rem] overflow-clip text-foreground">
        <div className="-z-10 -rotate-12 absolute top-[-10vw] left-[-10vw] aspect-square w-[30vw] animate-spin-slow bg-gradient-to-br from-purple-900 to-background blur-[10vw] [--spin-duration:5s]"></div>

        <Sidebar />

        <main className="h-[calc(100dvh-6rem)] border border-red-500">
          {children}
        </main>

        <footer className="h-[6rem] w-full border-t border-t-foreground/10 md:col-span-2">
          Player Controls
        </footer>
      </div>
    </ProtectedProviders>
  );
}
