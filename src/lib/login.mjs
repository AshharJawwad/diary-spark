export async function beginPasswordLogin(signIn, { identifier, password }) {
  if (typeof identifier !== "string" || !identifier.trim() || typeof password !== "string" || !password) {
    throw new Error("Email or username and password are required.");
  }
  // Normal sign-in omits transfer; account creation stays disabled.
  const attempt = await signIn.create({ identifier: identifier.trim(), signUpIfMissing: false });
  if (attempt.error) throw attempt.error;
  const result = await signIn.password({ password });
  if (result.error) throw result.error;
  return signIn.status;
}

export function loginVerification(signIn) {
  if (!["needs_client_trust", "needs_second_factor"].includes(signIn.status)) return null;
  const factors = signIn.supportedSecondFactors || [];
  const factor = factors.find(item => item.strategy === "totp")
    || factors.find(item => item.strategy === "email_code")
    || factors.find(item => item.strategy === "phone_code");
  return factor || null;
}

export async function sendLoginCode(signIn, factor) {
  let result;
  if (factor.strategy === "email_code") result = await signIn.mfa.sendEmailCode();
  else if (factor.strategy === "phone_code") result = await signIn.mfa.sendPhoneCode();
  else if (factor.strategy === "totp") return;
  else throw new Error("Unsupported verification method.");
  if (result.error) throw result.error;
}

export async function verifyLoginCode(signIn, factor, code) {
  if (!code.trim()) throw new Error("Enter your verification code.");
  let result;
  if (factor.strategy === "email_code") result = await signIn.mfa.verifyEmailCode({ code: code.trim() });
  else if (factor.strategy === "phone_code") result = await signIn.mfa.verifyPhoneCode({ code: code.trim() });
  else if (factor.strategy === "totp") result = await signIn.mfa.verifyTOTP({ code: code.trim() });
  else throw new Error("Unsupported verification method.");
  if (result.error) throw result.error;
  if (signIn.status !== "complete") throw new Error("Verification is not complete. Please try again.");
}
