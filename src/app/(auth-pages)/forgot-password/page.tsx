import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import forgotPasswordAction from "@/lib/supabase/actions/forgot-password-action";
import Link from "next/link";

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: Promise<{ message: Message }>;
}) {
  const message = (await searchParams).message;

  return (
    <>
      <form className="mx-auto flex w-full min-w-64 max-w-64 flex-1 flex-col gap-2 text-foreground [&>input]:mb-6">
        <div>
          <h1 className="font-medium text-2xl">Reset Password</h1>
          <p className="text-secondary-foreground text-sm">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          <FormMessage message={message} />
        </div>
      </form>
    </>
  );
}
