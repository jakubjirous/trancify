import CONFIG from "@/config/config";
import GlobalProviders from "@/providers/global-providers";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "../styles/tailwind.css";

export const metadata = CONFIG.metadata;

export const viewport = CONFIG.viewport;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
