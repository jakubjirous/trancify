import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction, signInWithGithubAction } from "@/lib/supabase/actions";
import Link from "next/link";

export default async function Login({
  searchParams,
}: { searchParams: Promise<{ message: Message }> }) {
  const message = (await searchParams).message;

  return (
    <div>
      <form className="flex min-w-64 flex-1 flex-col">
        <h1 className="font-medium text-2xl">Sign in</h1>
        <p className="text-foreground text-sm">
          Don't have an account?{" "}
          <Link
            className="font-medium text-foreground underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-foreground text-xs underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing in..." formAction={signInAction}>
            Sign in
          </SubmitButton>

          <FormMessage message={message} />
        </div>
      </form>
      <form>
        <SubmitButton
          pendingText="Signing in..."
          formAction={signInWithGithubAction}
        >
          Sign in with GitHub
        </SubmitButton>
      </form>
    </div>
  );
}
