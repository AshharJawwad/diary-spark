// Login authenticates existing Clerk users; account creation belongs to /register.
export const signInOptions = Object.freeze({
  routing: "path",
  path: "/login",
  signUpUrl: "/register",
  withSignUp: false,
  transferable: false,
  forceRedirectUrl: "/",
});

export function loginView({ isLoaded, isSignedIn, currentTask, useClerkFlow }) {
  if (!isLoaded) return "loading";
  if (isSignedIn && !currentTask) return "redirect";
  if (currentTask || useClerkFlow) return "clerk";
  return "credentials";
}
