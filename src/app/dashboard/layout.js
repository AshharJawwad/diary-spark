"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const Admin = pathname.startsWith("/dashboard/admindashboard");

  if (Admin) {
    return (
      <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
        <body className="min-h-full flex flex-col font-body bg-primary-foreground dark:bg-muted-foreground overflow-hidden overflow-y-scroll">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-body bg-primary-foreground dark:bg-muted-foreground overflow-hidden overflow-y-scroll">
        {children}
      </body>
    </html>
  );
}
