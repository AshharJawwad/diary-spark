import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { cookies } from "next/headers";
import { emailFromCookie } from "@/lib/account-lookup.mjs";

export const metadata = { title: "Login | DiarySpark" };

export default async function LoginPage({ params }) {
  const initialClerkFlow = Boolean((await params).login?.length);
  const email = emailFromCookie(
    (await cookies()).get("diaryspark_auth_email")?.value,
  );
  const configured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY,
  );
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md items-center px-4 pb-12 pt-56">
      <section
        aria-label="Log in to your account"
        className="w-full space-y-6 rounded-2xl border bg-background p-6 shadow-lg"
      >
        <h1 className="font-display text-2xl font-bold">
          Welcome back to DiarySpark
        </h1>
        <LoginForm
          initialEmail={email}
          configured={configured}
          initialClerkFlow={initialClerkFlow}
        />
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
