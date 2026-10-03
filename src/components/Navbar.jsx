"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/ModeBtn";
import { QuickSettings } from "./ui/QuickSettings";
import { InfoBtn } from "./ui/InfoBtn";
import { Show, UserButton } from "@clerk/nextjs";
import {
  getRegistrationStatus,
  getServerRegistrationStatus,
  subscribeRegistration,
} from "@/lib/browser-registration.mjs";

export default function Navbar({ authConfigured = false }) {
  // Active Tabs
  const [active, setActive] = useState("Home");
  const [sheetOpen, setSheetOpen] = useState(false);
  const registrationStatus = useSyncExternalStore(
    subscribeRegistration,
    getRegistrationStatus,
    getServerRegistrationStatus,
  );
  const accountLink =
    registrationStatus === "registered" ? (
      <Link
        href="/login"
        className="rounded-lg bg-primary px-5 py-1.5 text-center font-semibold text-primary-foreground"
      >
        Login
      </Link>
    ) : (
      <Link
        variant="outline"
        href="/register"
        className="rounded-lg bg-primary px-5 py-1.5 text-center font-semibold text-primary-foreground"
      >
        Register
      </Link>
    );
  const mobileAccountLink =
    registrationStatus === "registered" ? (
      <Link
        href="/login"
        onClick={() => setSheetOpen(false)}
        className="block w-full rounded-full bg-primary px-5 py-2 text-center font-semibold text-primary-foreground"
      >
        Login
      </Link>
    ) : (
      <Link
        href="/register"
        onClick={() => setSheetOpen(false)}
        className="block w-full rounded-full bg-primary px-5 py-2 text-center font-semibold text-primary-foreground"
      >
        Register
      </Link>
    );

  // Closing Sheet Component When Popup Modal Opens

  return (
    <nav className="fixed w-full h-36 md:h-16 items-center">
      <div className="relative flex items-center justify-between lg:justify-around pt-3 pl-3 pb-3 bg-background border-b border-b-gray-200 dark:border-b-gray-800">
        <h1 className="font-extrabold text-3xl md:text-4xl lg:text-4xl text-primary font-display">
          DiarySpark
        </h1>

        <ul className="hidden lg:flex items-center text-lg gap-8 font-semibold">
          <Link
            href="/"
            onClick={() => setActive("Home")}
            className={`${active === "Home" ? "text-primary" : "text-gray-700 hover:text-primary/85 dark:text-gray-200"}`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            onClick={() => setActive("Blog")}
            className={`${active === "Blog" ? "text-primary" : "text-gray-700 hover:text-primary/85 dark:text-gray-200"}`}
          >
            Blog
          </Link>
          <Link
            href="/trivia"
            onClick={() => setActive("Trivia")}
            className={`${active === "Trivia" ? "text-primary" : "text-gray-700 hover:text-primary/85 dark:text-gray-200"}`}
          >
            Trivia
          </Link>
          <Link
            href="/quest"
            onClick={() => setActive("Quest")}
            className={`${active === "Quest" ? "text-primary" : "text-gray-700 hover:text-primary/85 dark:text-gray-200"}`}
          >
            Quest
          </Link>
          <Link
            href="/games"
            onClick={() => setActive("Games")}
            className={`${active === "Games" ? "text-primary" : "text-gray-700 hover:text-primary/85 dark:text-gray-200"}`}
          >
            Games
          </Link>
        </ul>

        <div className="flex gap-3 mr-4">
          <div className="hidden md:flex items-center space-x-3">
            <Button className="px-4 py-1 w-32 font-semibold border rounded-full text-lg text-center cursor-pointer">
              Subscribe
            </Button>
            {authConfigured ? (
              <>
                <Show when="signed-out">{accountLink}</Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </>
            ) : (
              accountLink
            )}
          </div>

          {/* Mobile Navigation Side Bar */}
          <div className="flex lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger
                render={
                  <Button variant="outline" className="cursor-pointer">
                    <Menu />
                  </Button>
                }
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-3xl md:text-4xl font-display font-extrabold text-primary">
                    DiarySpark
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                  {/* Page Tabs */}
                  <div className="flex flex-col items-center text-xl md:text-2xl lg:text-lg gap-5 font-body font-semibold mt-12 border-b pb-8 pt-3 overflow-hidden overflow-y-scroll no-scrollbar">
                    <Link
                      onClick={() => setActive("Home")}
                      href="/"
                      className={`w-96 text-center py-2 rounded-lg ${active === "Home" ? "text-primary bg-primary-foreground dark:bg-muted focus:ring focus:ring-violet-300" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      Home
                    </Link>
                    <Link
                      onClick={() => setActive("Blog")}
                      href="/blog"
                      className={`w-96 text-center py-2 rounded-lg ${active === "Blog" ? "text-primary bg-primary-foreground dark:bg-muted focus:ring focus:ring-violet-300" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      Blog
                    </Link>
                    <Link
                      onClick={() => setActive("Trivia")}
                      href="/trivia"
                      className={`w-96 text-center py-2 rounded-lg ${active === "Trivia" ? "text-primary bg-primary-foreground dark:bg-muted focus:ring focus:ring-violet-300" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      Trivia
                    </Link>
                    <Link
                      onClick={() => setActive("Quest")}
                      href="/quest"
                      className={`w-96 text-center py-2 rounded-lg ${active === "Quest" ? "text-primary bg-primary-foreground dark:bg-muted focus:ring focus:ring-violet-300" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      Quest
                    </Link>
                    <Link
                      onClick={() => setActive("Games")}
                      href="/games"
                      className={`w-96 text-center py-2 rounded-lg ${active === "Games" ? "text-primary bg-primary-foreground dark:bg-muted focus:ring focus:ring-violet-300" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      Games
                    </Link>
                  </div>
                  <div className="flex flex-col w-full mt-12 md:mt-72">
                    <h2 className="text-2xl font-display font-semibold w-full">
                      Accessibility
                    </h2>
                    <div className="w-full">
                      {/* Mode Toggle Button */}
                      <div className="flex flex-row items-center mt-5 gap-2">
                        <ModeToggle className="w-1/3 h-9" />

                        {/* Quick Settings Button */}
                        <div className="w-1/3">
                          <QuickSettings className="w-full h-9" />
                        </div>

                        {/* Feadback & Updates Button */}
                        <div className="w-1/3">
                          <InfoBtn className="w-full h-9" />
                        </div>
                      </div>
                      <div className="flex flex-row items-center mt-5 gap-2">
                        <ModeToggle className="w-1/3 h-9" />

                        {/* Quick Settings Button */}
                        <div className="w-1/3">
                          <QuickSettings className="w-full h-9" />
                        </div>

                        {/* Feadback & Updates Button */}
                        <div className="w-1/3">
                          <InfoBtn className="w-full h-9" />
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetHeader>
                <SheetFooter>
                  {authConfigured ? (
                    <>
                      <Show when="signed-out">
                        <Link
                          href="/login"
                          onClick={() => setSheetOpen(false)}
                          className="block w-full rounded-lg bg-primary px-5 py-0.5 text-lg text-center font-semibold text-primary-foreground"
                        >
                          Login
                        </Link>
                        <Button variant="outline" aschild="true" className="block w-full rounded-lg px-5 py-0.5 text-lg text-center font-semibold">
                          <Link
                            href="/register"
                            onClick={() => setSheetOpen(false)}
                            
                          >
                            Register
                          </Link>
                        </Button>
                      </Show>
                      <Show when="signed-in">
                        <UserButton />
                      </Show>
                    </>
                  ) : (
                    mobileAccountLink
                  )}
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
