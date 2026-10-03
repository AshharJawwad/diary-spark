import { validAccountEmail } from "./account-lookup.mjs";

export function registrationParams(values) {
  const { name, username, email, password, confirmPassword } = values;
  if ([name, username, email, password, confirmPassword].some(value => typeof value !== "string" || !value.trim())) {
    throw new Error("Please complete all five fields.");
  }
  if (password !== confirmPassword) throw new Error("Passwords must match.");
  if (name.trim().length > 100 || username.trim().length > 64) throw new Error("Name or username is too long.");
  const emailAddress = validAccountEmail(email);
  if (!emailAddress) throw new Error("Enter a valid email address.");
  const [firstName, ...rest] = name.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" "), username: username.trim(), emailAddress, password };
}

export function registrationError(error) {
  return error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || "Unable to complete registration. Please try again.";
}

export async function startRegistration(signUp, values) {
  const result = await signUp.password(registrationParams(values));
  if (result.error) throw result.error;
  if (signUp.status === "complete") return "complete";
  if (signUp.status !== "missing_requirements" || signUp.missingFields?.length ||
      !signUp.unverifiedFields?.includes("email_address")) {
    throw new Error("Additional account details are required. Please contact support.");
  }
  const verification = await signUp.verifications.sendEmailCode();
  if (verification.error) throw verification.error;
  return "verification";
}
