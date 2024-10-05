import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

interface Config {
  metadata: Metadata;
}

const CONFIG: Config = {
  metadata: {
    metadataBase: new URL(defaultUrl),
    title: "Trancify",
    description:
      "The ultimate music player for trance and progressive lovers, delivering seamless beats and immersive soundscapes",
  },
};

export default CONFIG;
