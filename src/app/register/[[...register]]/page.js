import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";
import { cookies } from "next/headers";
import { emailFromCookie } from "@/lib/account-lookup.mjs";

export const metadata = { title: "Register | DiarySpark" };

export default async function RegisterPage() {
  const email = emailFromCookie((await cookies()).get("diaryspark_auth_email")?.value);
  const configured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md items-center px-4 pb-12 pt-34">
      <section aria-label="Create your account" className="w-full space-y-6 rounded-2xl border bg-background p-6 shadow-lg">
      <RegistrationForm initialEmail={email} configured={configured} />
      <p className="text-center text-sm">Already registered? <Link href="/login" className="font-semibold text-primary underline">Log in</Link></p>
      </section>
    </main>
  );
}
