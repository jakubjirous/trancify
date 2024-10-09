import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ROUTES from "@/config/routes";
import { signInAction, signInWithGithubAction } from "@/lib/supabase/actions";
import { Github, Music } from "lucide-react";
import Link from "next/link";

export default async function SignIn({
  searchParams,
}: { searchParams: Promise<{ message: Message }> }) {
  const message = (await searchParams).message;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border border-white border-opacity-10 bg-black bg-opacity-50 text-white shadow-2xl backdrop-blur-sm">
        <CardHeader className="relative text-center">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full bg-primary p-3 shadow-lg">
            <Music className="h-8 w-8 animate-pulse text-primary-foreground" />
          </div>
          <h1 className="mb-2 pt-4 font-bold font-heading text-4xl">
            Trancify
          </h1>
          <p className="text-zinc-400">Sign in to start your journey</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="flex flex-col">
            <SubmitButton
              pendingText="Signing in..."
              formAction={signInWithGithubAction}
              className="gap-2"
              color="secondary"
            >
              <Github className="h-[1em] w-[1em]" />
              <span>Continue with GitHub</span>
            </SubmitButton>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="text-foreground text-xs underline"
                  href={ROUTES.forgotPassword}
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
            </div>

            <SubmitButton pendingText="Signing in..." formAction={signInAction}>
              Continue with email
            </SubmitButton>
          </form>
          <FormMessage message={message} />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="flex flex-col items-center text-sm text-zinc-400">
            <span>Don't have an account?</span>
            <Link className="text-foreground underline" href={ROUTES.signUp}>
              Sign up for Trancify
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
