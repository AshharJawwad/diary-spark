"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { SignIn, useAuth, useSession, useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { loginView, signInOptions } from "@/lib/auth-policy.mjs";
import { beginPasswordLogin, loginVerification, sendLoginCode, verifyLoginCode } from "@/lib/login.mjs";
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
  const { isLoaded, isSignedIn } = useAuth();
  const { session, isLoaded: sessionLoaded } = useSession();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [useClerkFlow, setUseClerkFlow] = useState(initialClerkFlow);
  const [identifier, setIdentifier] = useState(initialEmail);
  const [verification, setVerification] = useState(null);
  const [notice, setNotice] = useState("");
  const inFlight = useRef(false);
  const codeRef = useRef(null);
  const busy = pending || fetchStatus === "fetching";
  const view = loginView({ isLoaded: isLoaded && sessionLoaded, isSignedIn, currentTask: session?.currentTask, useClerkFlow });

  useEffect(() => {
    if (view === "redirect") {
      rememberRegistration(true);
      router.replace("/");
      router.refresh();
    }
  }, [view, router]);

  useEffect(() => {
    if (verification && !busy) codeRef.current?.focus();
  }, [verification, busy]);

  async function finishLogin() {
    const result = await signIn.finalize({
      navigate: ({ session: activeSession, decorateUrl }) => {
        rememberRegistration(true);
        window.location.assign(decorateUrl(activeSession?.currentTask ? "/login" : "/"));
      },
    });
    if (result.error) throw result.error;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current || busy || !signIn) return;
    inFlight.current = true;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setPending(true);
    setError("");
    setIdentifier(String(values.identifier || "").trim());
    try {
      const status = await beginPasswordLogin(signIn, values);
      if (status === "complete") {
        await finishLogin();
      } else {
        const factor = loginVerification(signIn);
        if (factor) {
          setVerification(factor);
          await sendLoginCode(signIn, factor);
        } else {
          // Keep Clerk's flow for recovery, session tasks, and unsupported factors.
          setUseClerkFlow(true);
        }
      }
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || "Unable to log in. Please try again.");
    }
    finally { inFlight.current = false; setPending(false); }
  }

  async function handleVerification(event) {
    event.preventDefault();
    if (inFlight.current || busy || !signIn) return;
    const code = String(new FormData(event.currentTarget).get("code") || "");
    inFlight.current = true;
    setPending(true);
    setError("");
    setNotice("");
    try {
      await verifyLoginCode(signIn, verification, code);
      await finishLogin();
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || err?.message || "Unable to verify. Please try again.");
    } finally { inFlight.current = false; setPending(false); }
  }

  async function resendCode() {
    if (inFlight.current || busy || !signIn) return;
    inFlight.current = true;
    setPending(true);
    setError("");
    setNotice("");
    try {
      await sendLoginCode(signIn, verification);
      setNotice("A new verification code has been sent.");
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || err?.message || "Unable to send a code. Please try again.");
    } finally { inFlight.current = false; setPending(false); }
  }

  if (view === "loading" || view === "redirect") return <p role="status">{view === "redirect" ? "Redirecting to home…" : "Loading sign-in…"}</p>;
  if (view === "clerk") {
    return <SignIn {...signInOptions} initialValues={identifier.includes("@") ? { emailAddress: identifier } : { username: identifier }} appearance={{ elements: { rootBox: "w-full", cardBox: "w-full shadow-none", card: "bg-background text-foreground shadow-none", formButtonPrimary: "bg-primary text-primary-foreground" } }} />;
  }
  if (verification) return (
    <form onSubmit={handleVerification} className="w-full space-y-4" aria-busy={busy}>
      <p className="text-sm">{verification.strategy === "totp" ? "Enter the code from your authenticator app." : `Enter the verification code sent to ${verification.safeIdentifier || (verification.strategy === "email_code" ? "your email" : "your phone")}.`}</p>
      <label htmlFor="login-code" className="block text-sm font-semibold">Verification code</label>
      <input ref={codeRef} id="login-code" name="code" type="text" inputMode="numeric" autoComplete="one-time-code" required disabled={busy} className={inputClass} />
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {notice && <p role="status" className="text-sm">{notice}</p>}
      <Button type="submit" disabled={busy} className="w-full">{busy ? "Verifying…" : "Verify and log in"}</Button>
      {verification.strategy !== "totp" && <button type="button" disabled={busy} onClick={resendCode} className="text-sm font-semibold text-primary underline">Send a new code</button>}
    </form>
  );
  return <Credentials initialEmail={initialEmail} disabled={!signIn} pending={busy} error={error} onSubmit={handleSubmit} onRecovery={() => setUseClerkFlow(true)} />;
}

export default function LoginForm({ initialEmail = "", configured, initialClerkFlow = false }) {
  if (!configured) return <Credentials initialEmail={initialEmail} disabled error="Login is temporarily unavailable. Please try again later." />;
  return <ClerkLoginForm initialEmail={initialEmail} initialClerkFlow={initialClerkFlow} />;
}
