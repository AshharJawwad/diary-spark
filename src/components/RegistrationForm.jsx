"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { startRegistration, registrationError } from "@/lib/registration.mjs";
import { rememberRegistration } from "@/lib/browser-registration.mjs";

const inputClass = "w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60";
const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Full Name", autoComplete: "name", maxLength: 100 },
  { name: "username", label: "Username", type: "text", placeholder: "Username", autoComplete: "username", maxLength: 64 },
  { name: "email", label: "Email", type: "email", placeholder: "Email Address", autoComplete: "email", maxLength: 254 },
  { name: "password", label: "Password", type: "password", placeholder: "Password", autoComplete: "new-password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm Password", autoComplete: "new-password" },
];

function Fields({ details, disabled, pending, error, onSubmit }) {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4" aria-busy={pending}>
      <h2 className="font-display text-2xl font-bold">Create your account</h2>
      {fields.map(({ label, ...field }) => (
        <div key={field.name} className="space-y-1.5">
          <label htmlFor={`register-${field.name}`} className="block text-sm font-semibold">{label}</label>
          <div className="relative">
            <input {...field} type={field.type === "password" && visiblePasswords[field.name] ? "text" : field.type} id={`register-${field.name}`} required defaultValue={details?.[field.name]} className={`${inputClass}${field.type === "password" ? " pr-12" : ""}`} />
            {field.type === "password" && (
              <button
                type="button"
                aria-label={`${visiblePasswords[field.name] ? "Hide" : "Show"} ${label.toLowerCase()}`}
                aria-controls={`register-${field.name}`}
                aria-pressed={Boolean(visiblePasswords[field.name])}
                onClick={() => setVisiblePasswords((current) => ({ ...current, [field.name]: !current[field.name] }))}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
              >
                {visiblePasswords[field.name] ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
              </button>
            )}
          </div>
        </div>
      ))}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={disabled || pending} className="w-full cursor-pointer">{pending ? "Creating account…" : "Register"}</Button>
    </form>
  );
}

function ClerkRegistrationForm({ initialEmail }) {
  const { signUp, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const [step, setStep] = useState("details");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [details, setDetails] = useState({ email: initialEmail });
  const inFlight = useRef(false);
  const verificationInputRef = useRef(null);
  const busy = pending || fetchStatus === "fetching";

  useEffect(() => {
    if (step === "verification" && !busy) {
      verificationInputRef.current?.focus();
      verificationInputRef.current?.select();
    }
  }, [step, busy]);

  async function finish() {
    if (signUp.status !== "complete") throw new Error("Registration is not complete. Please verify your email and try again.");
    rememberRegistration(true);
    const result = await signUp.finalize({
      navigate: ({ session, decorateUrl }) => {
        window.location.assign(decorateUrl(session?.currentTask ? "/login" : "/"));
      },
    });
    if (result.error) throw result.error;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current || busy || !signUp) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    inFlight.current = true;
    setDetails({ name: values.name, username: values.username, email: values.email });
    setPending(true);
    setError("");
    try {
      const nextStep = await startRegistration(signUp, values);
      if (nextStep === "complete") {
        await finish();
      } else {
        setStep("verification");
      }
    } catch (err) { setError(registrationError(err)); }
    finally { inFlight.current = false; setPending(false); }
  }

  async function handleVerification(event) {
    event.preventDefault();
    if (inFlight.current || busy || !signUp) return;
    const code = String(new FormData(event.currentTarget).get("code") || "").trim();
    if (!code) { setError("Enter your verification code."); return; }
    inFlight.current = true;
    setPending(true);
    setError("");
    setNotice("");
    try {
      if (signUp.status !== "complete") {
        const result = await signUp.verifications.verifyEmailCode({ code });
        if (result.error) throw result.error;
      }
      await finish();
    } catch (err) { setError(registrationError(err)); }
    finally { inFlight.current = false; setPending(false); }
  }

  async function resendCode() {
    if (inFlight.current || busy || !signUp) return;
    inFlight.current = true;
    setPending(true);
    setError("");
    setNotice("");
    try {
      const result = await signUp.verifications.sendEmailCode();
      if (result.error) throw result.error;
      setNotice("A new verification code has been sent.");
    } catch (err) { setError(registrationError(err)); }
    finally { inFlight.current = false; setPending(false); }
  }

  async function changeDetails() {
    if (inFlight.current || busy || !signUp) return;
    inFlight.current = true;
    setPending(true);
    try {
      const result = await signUp.reset();
      if (result.error) throw result.error;
      setStep("details");
      setError("");
      setNotice("");
    } catch (err) { setError(registrationError(err)); }
    finally { inFlight.current = false; setPending(false); }
  }

  if (isSignedIn) return <p>You’re already signed in. <Link href="/" className="text-primary underline">Go home</Link></p>;
  if (step === "verification") {
    return (
      <div className="w-full space-y-4">
        <h2 className="font-display text-2xl font-bold">Verify your email</h2>
        <p className="text-sm">Enter the code sent to your email address to complete registration.</p>
        <form onSubmit={handleVerification} className="space-y-4 z-20" aria-busy={busy}>
          <label htmlFor="register-code" className="block text-sm font-semibold">Verification code</label>
          <input ref={verificationInputRef} id="register-code" name="code" type="text" inputMode="numeric" autoComplete="one-time-code" required disabled={busy} className={inputClass} />
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {notice && <p role="status" className="text-sm">{notice}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? "Please wait…" : "Verify email"}</Button>
        </form>
        <button type="button" disabled={busy} onClick={resendCode} className="text-sm font-semibold text-primary underline disabled:opacity-50">Send a new code</button>
        <button type="button" disabled={busy} onClick={changeDetails} className="block text-sm font-semibold text-primary underline disabled:opacity-50">Change registration details</button>
      </div>
    );
  }
  return <Fields details={details} disabled={!signUp} pending={busy} error={error} onSubmit={handleSubmit} />;
}

export default function RegistrationForm({ initialEmail = "", configured }) {
  if (!configured) {
    return <Fields details={{ email: initialEmail }} disabled error="Registration is temporarily unavailable. Please try again later." />;
  }
  return (
    <>
      <ClerkRegistrationForm initialEmail={initialEmail} />
      <div id="clerk-captcha" />
    </>
  );
}
