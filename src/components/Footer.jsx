import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full min-h-76 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-12 py-8 pb-16 gap-x-96 justify-around border-b">
        <div className="flex">
          <Image src="/logo.png" alt="Logo" width={128} height={128} />
          <h2 className="text-3xl font-bold font-display">DiarySpark</h2>
        </div>
        <div className="flex flex-col gap-y-1.5 space-x-36">
          <h5 className="text-xl font-bold font-display">Main</h5>
          <Link href="/blog" className="text-lg font-medium font-body">
            Blog
          </Link>
          <Link href="/trivia" className="text-lg font-medium font-body">
            Trivia
          </Link>
          <Link href="/quest" className="text-lg font-medium font-body">
            Quest
          </Link>
          <Link href="/hubb" className="text-lg font-medium font-body">
            Hubb
          </Link>
        </div>
        <div className="flex flex-col gap-y-1.5 space-x-36">
          <h5 className="text-xl font-bold font-display">Legal</h5>
          <Link href="/privacy" className="text-lg font-medium font-body">
            Privacy
          </Link>
          <Link href="/terms" className="text-lg font-medium font-body">
            Terms
          </Link>
          <Link href="/cookies" className="text-lg font-medium font-body">
            Cookies
          </Link>
        </div>
        <div className="flex flex-col gap-y-1.5 space-x-36">
          <h5 className="text-xl font-bold font-display">Company</h5>
          <Link href="/about" className="text-lg font-medium font-body">
            About
          </Link>
          <Link href="/contact" className="text-lg font-medium font-body">
            Contact
          </Link>
          <Link href="/careers" className="text-lg font-medium font-body">
            Careers
          </Link>
        </div>
      </div>
      <div className="w-full h-5 p-4 justify-center items-center text-center text-sm">&copy; 2026 DiarySpark. All rights reserved.</div>
    </footer>
  );
}
