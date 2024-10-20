import ThemeSwitcher from "@/components/theme-switcher";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-clip">
      <div className="absolute inset-0 z-0 aspect-square w-[200dvw] animate-spin-slow rounded-full bg-gradient-to-br from-purple-900 via-background to-indigo-900 blur-[10rem]"></div>
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
        <ThemeSwitcher />
      </div>
      {children}
    </div>
  );
}
