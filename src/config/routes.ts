type Keys = "root" | "tracks" | "playlist" | "playlists";

type Routes = {
  [K in Keys]: string;
};

const ROUTES: Routes = {
  root: "/",
  tracks: "/tracks",
  playlist: "/playlist",
  playlists: "/playlists",
};

export default ROUTES;
