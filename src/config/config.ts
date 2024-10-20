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
    themeColor: "#7c3aed",
  },
};

export default CONFIG;
