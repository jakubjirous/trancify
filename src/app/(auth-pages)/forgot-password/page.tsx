import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import TrancifyLogo from "@/components/trancify-logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ROUTES from "@/config/routes";
import { forgotPasswordAction } from "@/lib/supabase/actions";
import Link from "next/link";

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: Promise<{ message: Message }>;
}) {
  const message = (await searchParams).message;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border border-white border-opacity-10 bg-background text-foreground text-white shadow-2xl backdrop-blur-sm">
        <CardHeader className="relative text-center">
          <TrancifyLogo />
          <h1 className="mb-2 pt-6 font-bold font-heading text-4xl text-foreground">
            Reset Password
          </h1>
          <p className="text-zinc-400">
            Enter the email address to your Trancify account and we'll send you
            an email.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="flex flex-col gap-8 text-foreground">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>

            <SubmitButton formAction={forgotPasswordAction}>
              Reset Password
            </SubmitButton>
          </form>
          <FormMessage message={message} />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="flex flex-col items-center text-sm text-zinc-400">
            <span>Already have an account?</span>
            <Link className="text-foreground underline" href={ROUTES.signIn}>
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
