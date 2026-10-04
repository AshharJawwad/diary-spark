"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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
import { Info, Menu, Settings } from "lucide-react";
import { ModeToggle } from "./ui/ModeBtn";
import { QuickSettings } from "./ui/QuickSettings";
import { InfoBtn } from "./ui/InfoBtn";
import { UserButton, useAuth } from "@clerk/nextjs";
import {
  getRegistrationStatus,
  getServerRegistrationStatus,
  subscribeRegistration,
} from "@/lib/browser-registration.mjs";

function NavbarAccount({ children, onSignIn, mobile = false }) {
  const { isLoaded, isSignedIn } = useAuth();
  const previousSignedIn = useRef(isSignedIn);
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && previousSignedIn.current !== true) onSignIn?.();
    previousSignedIn.current = isSignedIn;
  }, [isLoaded, isSignedIn, onSignIn]);
  // Keep the account link visible while Clerk initializes for a visitor.
  return isLoaded && isSignedIn ? (
    <UserButton
      showName
      signInUrl="/login"
      appearance={{
        elements: {
          rootBox: mobile ? { width: "100%", minWidth: 0 } : {},
          userButtonBox: {
            display: "flex",
            flexDirection: mobile ? "row-reverse" : "row",
            alignItems: "center",
            gap: mobile ? "0.5rem" : "0.75rem",
            minWidth: 0,
            maxWidth: "100%",
          },
          userButtonOuterIdentifier: {
            fontWeight: mobile ? 700 : 600,
            fontSize: mobile ? "0.9rem" : "0.975rem",
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "var(--foreground)",
          },
          avatarBox: {
            width: mobile ? "2.75rem" : "2rem",
            height: mobile ? "2.75rem" : "2rem",
            flexShrink: 0,
          },
          userButtonTrigger: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: mobile ? "left" : "center",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
            height: mobile ? "3.5rem" : "2.5rem",
            width: mobile ? "100%" : "10.75rem",
            maxWidth: "100%",
            paddingInline: mobile ? "0.35rem" : undefined,
            borderRadius: mobile ? "10px" : "9999px",
          },
          userButtonPopoverCard: { maxWidth: "calc(100vw - 1rem)" },
        },
      }}
    />
  ) : (
    children
  );
}

export default function Navbar({ authConfigured = false }) {
  // Active Tabs
  const [active, setActive] = useState("Home");
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const [activeModal, setActiveModal] = useState(null);
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
      <Button
        variant="outline"
        nativeButton={false}
        render={<Link href="/register" prefetch={true} />}
        className="rounded-lg px-5 py-1.5 text-center font-semibold"
      >
        Register
      </Button>
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
  const openSheetModal = (modal) => {
    setActiveModal(modal);
    setSheetOpen(false);
  };

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
            href="/community"
            onClick={() => setActive("Community")}
            className={`${active === "Community" ? "text-primary" : "text-gray-700 hover:text-primary/85 dark:text-gray-200"}`}
          >
            Community
          </Link>
        </ul>

        <div className="flex gap-3 mr-4">
          <div className="hidden md:flex items-center space-x-3">
            <Button className="px-4 py-1 w-32 font-semibold border rounded-full text-lg text-center cursor-pointer">
              Subscribe
            </Button>
            {authConfigured ? (
              <NavbarAccount>{accountLink}</NavbarAccount>
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
              {sheetOpen && (
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="text-3xl md:text-4xl font-display font-extrabold text-primary">
                      DiarySpark
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
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
                      onClick={() => setActive("Community")}
                      href="/community"
                      className={`w-96 text-center py-2 rounded-lg ${active === "Community" ? "text-primary bg-primary-foreground dark:bg-muted focus:ring focus:ring-violet-300" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      Community
                    </Link>
                  </div>
                  <div className="flex flex-col w-full mt-12 md:mt-72 p-4">
                    <h2 className="text-2xl font-display font-semibold w-full">
                      Accessibility
                    </h2>
                    <div className="w-full z-auto">
                      {/* Mode Toggle Button */}
                      <div className="flex flex-row items-center mt-5 gap-2">
                        <ModeToggle className="w-1/3 h-9" />

                        {/* Quick Settings Button */}
                        <div className="w-1/3">
                          <Button
                            type="button"
                            size="icon"
                            aria-label="Open quick settings"
                            onClick={() => openSheetModal("settings")}
                            className="w-full h-9 relative overflow-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                          >
                            <Settings
                              aria-hidden="true"
                              className="h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out"
                            />
                          </Button>
                        </div>

                        {/* Feadback & Updates Button */}
                        <div className="w-1/3">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Open feedback and updates"
                            onClick={() => openSheetModal("feedback")}
                            className="w-full h-9 relative overflow-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                          >
                            <Info
                              aria-hidden="true"
                              className="h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out text-gray-500"
                            />
                          </Button>
                        </div>
                      </div>

                      {/* <div className="flex flex-row items-center mt-5 gap-2">
                      <ModeToggle className="w-1/3 h-9" />

                      
                      <div className="w-1/3">
                        <QuickSettings className="w-full h-9" />
                      </div>

                      
                      <div className="w-1/3">
                        <InfoBtn className="w-full h-9" />
                      </div>
                    </div> */}
                    </div>
                  </div>
                  <SheetFooter>
                    {authConfigured ? (
                      <NavbarAccount mobile onSignIn={closeSheet}>
                        <Link
                          href="/login"
                          prefetch={true}
                          onNavigate={() => setSheetOpen(false)}
                          className="block w-full rounded-lg bg-primary px-5 py-0.5 text-lg text-center font-semibold text-primary-foreground"
                        >
                          Login
                        </Link>
                        <Button
                          variant="outline"
                          nativeButton={false}
                          render={
                            <Link
                              href="/register"
                              prefetch={true}
                              onNavigate={() => setSheetOpen(false)}
                            />
                          }
                          className="block w-full rounded-lg px-5 py-0.5 text-lg text-center font-semibold"
                        >
                          Register
                        </Button>
                      </NavbarAccount>
                    ) : (
                      mobileAccountLink
                    )}
                  </SheetFooter>
                </SheetContent>
              )}
            </Sheet>
          </div>
        </div>
      </div>
      <QuickSettings
        hideTrigger
        open={activeModal === "settings"}
        onOpenChange={(open) => {
          if (!open) setActiveModal(null);
        }}
      />
      <InfoBtn
        hideTrigger
        open={activeModal === "feedback"}
        onOpenChange={(open) => {
          if (!open) setActiveModal(null);
        }}
      />
    </nav>
  );
}
