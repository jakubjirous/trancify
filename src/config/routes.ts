type Keys =
  | "root"
  | "signIn"
  | "signUp"
  | "forgotPassword"
  | "dashboard"
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
  resetPassword: "/reset-password",
  authCallback: "/auth/callback",
};

export default ROUTES;
