type Keys =
  | "root"
  | "signIn"
  | "signUp"
  | "forgotPassword"
  | "dashboard"
  | "tracks"
  | "playlist"
  | "playlists"
  | "resetPassword"
  | "authCallback";

type Routes = {
  [K in Keys]: string;
};

const ROUTES: Routes = {
  root: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  tracks: "/dashboard/tracks",
  playlist: "/dashboard/playlist",
  playlists: "/dashboard/playlists",
  resetPassword: "/reset-password",
  authCallback: "/auth/callback",
};

export default ROUTES;
