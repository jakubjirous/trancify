import Hero from "@/components/hero";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";

export default async function Index() {
  return (
    <>
      <Hero />
      <main className="flex flex-1 flex-col gap-6 px-4">
        <h2 className="mb-4 font-medium text-xl">Next steps</h2>
        <SignUpUserSteps />
      </main>
    </>
  );
}
