"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import ActionBar from "@/components/ActionBar";
import Footer from "@/components/Footer";

export default function AppShell({ children, authConfigured }) {
  const pathname = usePathname();
  const dashboardRoute = pathname?.startsWith("/dashboard");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {!dashboardRoute && <Navbar authConfigured={authConfigured} />}
      {!dashboardRoute && <ActionBar />}
      {children}
      {!dashboardRoute && <Footer />}
    </ThemeProvider>
  );
}
