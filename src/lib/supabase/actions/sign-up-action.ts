"use server";

import ROUTES from "@/config/routes";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/utils/encoded-redirect";
import { headers } from "next/headers";

export default async function signUpAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const supabase = createClient();

  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}${ROUTES.authCallback}`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", ROUTES.signUp, error.message);
  } else {
    return encodedRedirect(
      "success",
      ROUTES.signUp,
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
}
