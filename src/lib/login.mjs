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
