import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trancify",
    short_name: "Trancify",
    description:
      "The ultimate music player for trance and progressive lovers, delivering seamless beats and immersive soundscapes",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/assets/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
