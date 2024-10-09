import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-clip">
      <div className="absolute inset-0 z-0 aspect-square w-[200dvw] animate-spin-slow rounded-full bg-gradient-to-br from-purple-900 via-black to-indigo-900 blur-3xl"></div>
      {children}
    </div>
  );
}
