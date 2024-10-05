import CONFIG from "@/config/config";
import Providers from "@/providers/providers";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "./../styles/tailwind.css";

export const metadata = CONFIG.metadata;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
