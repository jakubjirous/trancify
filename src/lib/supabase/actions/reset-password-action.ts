"use server";

import ROUTES from "@/config/routes";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/utils/encoded-redirect";

export default async function resetPasswordAction(formData: FormData) {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      `${ROUTES.dashboard}${ROUTES.resetPassword}`,
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      `${ROUTES.dashboard}${ROUTES.resetPassword}`,
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      `${ROUTES.dashboard}${ROUTES.resetPassword}`,
      "Password update failed",
    );
  }

  encodedRedirect(
    "success",
    `${ROUTES.dashboard}${ROUTES.resetPassword}`,
    "Password updated",
  );
}
