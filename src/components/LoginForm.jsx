"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { SignIn, useAuth, useSession, useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { signInOptions } from "@/lib/auth-policy.mjs";
import { beginPasswordLogin } from "@/lib/login.mjs";
import { rememberRegistration } from "@/lib/browser-registration.mjs";

const inputClass = "w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60";

function Credentials({ initialEmail, disabled, pending, error, onSubmit, onRecovery }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4" aria-busy={pending}>
      <div className="space-y-1.5">
        <label htmlFor="login-identifier" className="block text-sm font-semibold">Email or Username</label>
        <input id="login-identifier" name="identifier" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} defaultValue={initialEmail} required disabled={disabled || pending} className={inputClass} />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="login-password" className="block text-sm font-semibold">Password</label>
        <div className="relative">
          <input id="login-password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" required disabled={disabled || pending} className={`${inputClass} pr-12`} />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-controls="login-password"
            aria-pressed={showPassword}
            disabled={disabled || pending}
            onClick={() => setShowPassword((current) => !current)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60"
          >
            {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={disabled || pending} className="w-full">{pending ? "Logging in…" : "Login"}</Button>
      {onRecovery && <button type="button" disabled={disabled || pending} onClick={onRecovery} className="text-sm font-semibold text-primary underline">Account recovery</button>}
    </form>
  );
}

function ClerkLoginForm({ initialEmail, initialClerkFlow }) {
  const { signIn, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const { session } = useSession();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [useClerkFlow, setUseClerkFlow] = useState(initialClerkFlow);
  const [identifier, setIdentifier] = useState(initialEmail);
  const busy = pending || fetchStatus === "fetching";

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy || !signIn) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setPending(true);
    setError("");
    setIdentifier(String(values.identifier || "").trim());
    try {
      const status = await beginPasswordLogin(signIn, values);
      if (status === "complete") {
        const result = await signIn.finalize({
          navigate: ({ session: activeSession, decorateUrl }) => {
            rememberRegistration(true);
            window.location.assign(decorateUrl(activeSession?.currentTask ? "/login" : "/"));
          },
        });
        if (result.error) throw result.error;
      } else {
        // Clerk's UI completes device verification, MFA, and other remaining steps.
        setUseClerkFlow(true);
      }
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || "Unable to log in. Please try again.");
    }
    finally { setPending(false); }
  }

  if (useClerkFlow || session?.currentTask) {
    return <SignIn {...signInOptions} initialValues={identifier.includes("@") ? { emailAddress: identifier } : { username: identifier }} appearance={{ elements: { rootBox: "w-full", cardBox: "w-full shadow-none", card: "bg-background text-foreground shadow-none", formButtonPrimary: "bg-primary text-primary-foreground" } }} />;
  }
  if (isSignedIn) return <p>You’re already signed in. <Link href="/" className="text-primary underline">Go home</Link></p>;
  return <Credentials initialEmail={initialEmail} disabled={!signIn} pending={busy} error={error} onSubmit={handleSubmit} onRecovery={() => setUseClerkFlow(true)} />;
}

export default function LoginForm({ initialEmail = "", configured, initialClerkFlow = false }) {
  if (!configured) return <Credentials initialEmail={initialEmail} disabled error="Login is temporarily unavailable. Please try again later." />;
  return <ClerkLoginForm initialEmail={initialEmail} initialClerkFlow={initialClerkFlow} />;
}
