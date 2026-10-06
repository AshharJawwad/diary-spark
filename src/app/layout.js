"use client";

import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import ActionBar from "@/components/ActionBar";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

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
  const pathname = usePathname();

  const dashboardRoute = pathname.startsWith("/dashboard");

  const authConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY,
  );

  const content = (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {!dashboardRoute && <Navbar authConfigured={authConfigured} />}
      {!dashboardRoute && <ActionBar />}
      {children}
      {!dashboardRoute && <Footer />}
    </ThemeProvider>
  );

  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} h-full antialiased no-scrollbar`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body bg-primary-foreground dark:bg-muted-foreground overflow-hidden overflow-y-scroll">
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
