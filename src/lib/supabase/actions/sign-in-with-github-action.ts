"use server";

import ROUTES from "@/config/routes";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/utils/encoded-redirect";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function signInWithGithubAction() {
  const supabase = createClient();

  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}${ROUTES.authCallback}`,
    },
  });

  if (error) {
    return encodedRedirect("error", ROUTES.signIn, error.message);
  }

  if (data.url) {
    return redirect(data.url);
  }
}
