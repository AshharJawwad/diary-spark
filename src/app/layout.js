import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  const authConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY,
  );

  const content = (
    <AppShell authConfigured={authConfigured}>
      {children}
    </AppShell>
  );

  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} h-full antialiased no-scrollbar`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body overflow-hidden overflow-y-scroll">
        {authConfigured ? (
          <ClerkProvider
            signInUrl="/login"
            signUpUrl="/register"
            signInForceRedirectUrl="/"
            signInFallbackRedirectUrl="/"
            signUpFallbackRedirectUrl="/"
          >
            {content}
          </ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}
