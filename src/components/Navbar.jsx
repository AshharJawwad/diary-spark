"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/ModeBtn";
import QuickSettings from "./ui/QuickSettings";

export default function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <nav className="fixed w-full h-36 md:h-16 items-center z-20">
      <div className="relative flex items-center justify-between lg:justify-around pt-3 pl-3 pb-3 bg-amber-500 border-b border-b-gray-300">
        <h3 className="font-extrabold text-2xl lg:text-4xl text-primary font-display">
          DiarySpark
        </h3>

        <ul className="hidden lg:flex items-center text-lg gap-8 font-semibold">
          <Link
            href="/"
            onClick={() => setActive("Home")}
            className={`${active === "Home" ? "text-primary" : "text-gray-700"}`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            onClick={() => setActive("Blog")}
            className={`${active === "Blog" ? "text-primary" : "text-gray-700"}`}
          >
            Blog
          </Link>
          <Link
            href="/trivia"
            onClick={() => setActive("Trivia")}
            className={`${active === "Trivia" ? "text-primary" : "text-gray-700"}`}
          >
            Trivia
          </Link>
          <Link
            href="/quest"
            onClick={() => setActive("Quest")}
            className={`${active === "Quest" ? "text-primary" : "text-gray-700"}`}
          >
            Quest
          </Link>
          <Link
            href="/games"
            onClick={() => setActive("Games")}
            className={`${active === "Games" ? "text-primary" : "text-gray-700"}`}
          >
            Games
          </Link>
        </ul>

        <div className="flex gap-3 mr-4">
          <div className="hidden md:flex items-center space-x-3">
            <Button className="px-4 py-1 w-32 font-semibold border rounded-full text-lg text-center cursor-pointer">
              Subscribe
            </Button>
            <Button className="px-4 py-1 w-24 font-semibold border rounded-full text-lg text-center cursor-pointer">
              Login
            </Button>
          </div>

          {/* Mobile Navigation Side Bar */}
          <div className="flex lg:hidden">
            <Sheet className="w-full md:max-w-sm">
              <SheetTrigger
                render={
                  <Button variant="outline" className="cursor-pointer">
                    <Menu />
                  </Button>
                }
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-4xl font-display font-extrabold text-primary">
                    DiarySpark
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                  <div className="flex flex-col items-center text-lg gap-8 font-medium mt-28">
                    <Link href="/">Home</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/trivia">Trivia</Link>
                    <Link href="/quest">Quest</Link>
                    <Link href="/games">Games</Link>
                  </div>
                  <div className="flex flex-col w-full">
                    <h2 className="text-2xl font-display font-semibold mt-15 w-full">
                      Accessibility
                    </h2>
                    <div className="w-full">
                      {/* Mode Toggle Button */}
                      <div className="flex flex-row mt-5 space-x-3">
                        <ModeToggle className="w-1/3" />

                        <div className="w-1/3">
                          <QuickSettings className="w-full" />
                        </div>
                      </div>

                      {/* Quick Settings Button */}
                      <div className="mt-5 space-x-3"></div>
                    </div>
                  </div>
                </SheetHeader>
                <SheetFooter>
                  <Button className="w-full">Login</Button>
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
