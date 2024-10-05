import ROUTES from "@/config/routes";
import Link from "next/link";

export default async function Index() {
  return (
    <main className="grid place-content-center p-8">
      <ul>
        <li>
          <Link href={ROUTES.dashboard}>Dashboard</Link>
        </li>
      </ul>
    </main>
  );
}
