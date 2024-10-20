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
  dashboard: "/",
  tracks: "/tracks",
  playlist: "/playlist",
  playlists: "/playlists",
  resetPassword: "/reset-password",
  authCallback: "/auth/callback",
};

export default ROUTES;
