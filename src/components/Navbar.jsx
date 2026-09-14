"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Accessibility, LogOut, Menu, Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ui/ModeToggle";
import { MobNavMode } from "./ui/MobNavMode";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex font-body fixed h-16 w-full z-40 justify-between px-2 bg-white dark:bg-background shadow-sm lg:border-none lg:justify-around items-center sm:px-2 sm:z-40 lg:px-5 lg:z-30 ">
      {/* Logo Area */}
      <div className="text-center lg:p-2 lg:rounded-full lg:w-44">
        <h2 className="flex text-4xl font-display font-extrabold text-primary">
          Diary<span className="text-amber-400">S</span>park
        </h2>
      </div>

      {/* Navigation Area */}
      <div className="hidden lg:flex lg:items-center lg:justify-center lg:p-2 lg:rounded-full">
        <Link href="/" className="mx-3 text-lg cursor-pointer">
          Home
        </Link>
        <Link href="/blog" className="mx-3 text-lg cursor-pointer">
          Blog
        </Link>
        <Link href="/quiz" className="mx-3 text-lg cursor-pointer">
          Quiz
        </Link>
        <Link href="/challenge" className="mx-3 text-lg cursor-pointer">
          Quest
        </Link>
      </div>

      {/* Login Button & Mobile Navigation Area */}
      <div className="flex items-center justify-center gap-2 lg:rounded-full lg:min-w-38">
        {/* Mode Toggle Butten for Mobile and Mini Tablet Devices */}
        <ModeToggle className="md:hidden" />

        {/* Login/register Button */}
        <Show when="signed-in">
          <UserButton />
        </Show>
        <Show when="signed-out">
          <SignInButton>
            <Link href="/log-in">
              <Button className="h-10 w-26 text-center text-lg rounded-full font-semibold cursor-pointer">
                Login
              </Button>
            </Link>
          </SignInButton>
          <SignUpButton>
            <Link href="/register">
              <Button
                variant="outline"
                className="h-10 w-26 text-center text-lg rounded-full font-semibold cursor-pointer"
              >
                Register
              </Button>
            </Link>
          </SignUpButton>
        </Show>

        {/* Mobile Navigation */}
        <div className="items-center lg:hidden">
          <Sheet>
            <SheetTrigger
              className="border items-center p-1 rounded-md"
              aschild="true"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="">
                <SheetTitle className="font-display text-3xl font-extrabold">
                  DiarySpark
                </SheetTitle>
                <SheetDescription className="flex flex-col font-body font-semibold text-lg gap-y-2 mt-16 p-3 border-b">
                  <Link
                    href="/"
                    className="mx-3 sm:text-center md:text-start font-bold sm:text-lg md:text-xl w-full rounded-md p-2 cursor-pointer"
                  >
                    Home
                  </Link>
                  <Link
                    href="/blog"
                    className="mx-3 sm:text-center md:text-start font-bold sm:text-lg md:text-xl w-full rounded-md p-2 cursor-pointer"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/quiz"
                    className="mx-3 sm:text-center md:text-start font-bold sm:text-lg md:text-xl w-full rounded-md p-2 cursor-pointer"
                  >
                    Quiz
                  </Link>
                  <Link
                    href="/challenge"
                    className="mx-3 sm:text-center md:text-start font-bold sm:text-lg md:text-xl w-full rounded-md p-2 cursor-pointer"
                  >
                    Quest
                  </Link>
                </SheetDescription>
                <div className="flex flex-col mt-36 pr-3 border-b">
                  <h2 className="font-extrabold font-display text-3xl">
                    Actions
                  </h2>
                  <div className="flex gap-2 w-full mt-5 mb-3">
                    <Button className="w-1/3 h-10">
                      <Settings className="w-[1.2rem] h-[1.2rem]" />
                    </Button>
                    <MobNavMode />
                    <Button className="w-1/3 h-10">
                      <Accessibility className="w-[1.2rem] h-[1.2rem]" />
                    </Button>
                  </div>
                  <div className="flex gap-2 w-full mt-3 mb-7">
                    <Button variant="outline" className="w-1/3 h-10">
                      <Accessibility className="w-10 h-10" />
                    </Button>
                    <Button className="w-1/3 h-10">
                      <Settings className="w-10 h-10" />
                    </Button>
                    <Button variant="outline" className="w-1/3 h-10">
                      <Settings className="w-10 h-10" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>
              <SheetFooter className="font-body">
                <div className="flex flex-col gap-y-3">
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                  <Show when="signed-out">
                    <SignInButton>
                      <Button className="h-10 w-full text-center text-lg rounded-full font-semibold cursor-pointer">
                        Login
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button
                        variant="outline"
                        className="h-10 w-full text-center text-lg rounded-full font-semibold cursor-pointer"
                      >
                        Register
                      </Button>
                    </SignUpButton>
                  </Show>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
