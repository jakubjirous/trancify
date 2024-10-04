import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import signInWithGithubAction from "@/lib/supabase/actions/sign-in-with-github-action";
import signUpAction from "@/lib/supabase/actions/sign-up-action";
import Link from "next/link";

export default async function Signup({
  searchParams,
}: { searchParams: Promise<{ message: Message }> }) {
  const message = (await searchParams).message;

  if (message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <form className="mx-auto flex min-w-64 max-w-64 flex-col">
        <h1 className="font-medium text-2xl">Sign up</h1>
        <p className="text text-foreground text-sm">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
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
    </>
  );
}
