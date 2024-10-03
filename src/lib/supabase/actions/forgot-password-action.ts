import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/utils/encoded-redirect";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email")?.toString();

  const supabase = createClient();

  const origin = headers().get("origin");

  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};