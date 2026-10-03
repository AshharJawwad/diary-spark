// Login authenticates existing Clerk users; account creation belongs to /register.
export const signInOptions = Object.freeze({
  routing: "path",
  path: "/login",
  signUpUrl: "/register",
  withSignUp: false,
  transferable: false,
  forceRedirectUrl: "/",
});
