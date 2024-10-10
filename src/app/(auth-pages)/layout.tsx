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
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <ThemeSwitcher />
      </div>
      {children}
    </div>
  );
}
