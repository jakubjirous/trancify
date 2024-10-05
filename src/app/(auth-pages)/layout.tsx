import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="grid h-screen place-items-center p-8">{children}</div>;
}
