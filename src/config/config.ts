import { Metadata, Viewport } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

interface Config {
  metadata: Metadata;
  viewport: Viewport;
}

const CONFIG: Config = {
  metadata: {
    metadataBase: new URL(defaultUrl),
    title: "Trancify",
    description:
      "The ultimate music player for trance and progressive lovers, delivering seamless beats and immersive soundscapes",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
    themeColor: "", // TODO: add theme color in HEX (Jakub Jirous 2024-10-05 13:53:12)
  },
};

export default CONFIG;
