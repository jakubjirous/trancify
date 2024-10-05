"use server";

import ROUTES from "@/config/routes";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function signOutAction() {
  const supabase = createClient();

  await supabase.auth.signOut();

  return redirect(ROUTES.signIn);
}
