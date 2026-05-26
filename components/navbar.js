"use client";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobModeToggle } from "./ui/modebtn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "700",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "500",
});

const Navbar = () => {
  return (
    <nav className="p-3 justify-center items-center bg-background/50 border-b sticky top-0 back backdrop-blur">
      {/* Navbar Logo & Name Area */}
      <div className="container md:mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className={`text-3xl font-bold ${geistSans.className}`}>
            <h1>DiarySpark</h1>
          </div>
        </Link>
        {/* Navigation Links */}
        <div
          className={`hidden md:flex items-center space-x-6 ${geistMono.className}`}
        >
          <Link href="/" className=" text-xl hover:text-violet-400">
            Home
          </Link>
          <Link href="/blog" className="text-xl hover:text-violet-400">
            Blog
          </Link>
          <Link href="/srtory" className="text-xl hover:text-violet-400">
            Story
          </Link>
          <Link href="/quiz" className="text-xl hover:text-violet-400">
            Quiz
          </Link>
        </div>
        {/* Signin/Signup & Avatar and Name Area */}
        <div className="flex justify-center gap-x-2">
          <Button
            className={`hidden items-center md:block rounded-full w-24 h-10 font-medium hover:bg-violet-600 text-md py-2 px-4 cursor-pointer ${geistMono.className}`}
          >
            Singin
          </Button>
          <Button
            variant="outline"
            className={`hidden md:block items-center rounded-full w-24 h-10 font-medium text-md py-2 px-4 cursor-pointer ${geistMono.className}`}
          >
            Singup
          </Button>

          {/* Mobile device Navbar Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="text-black dark:text-white pt-1" />
              </SheetTrigger>
              <SheetContent className={"w-full"}>
                {/* <-- Add side="left" */}
                <SheetHeader>
                  <SheetTitle
                    className={`text-3xl font-bold ${geistSans.className}`}
                  >
                    DiarySpark
                  </SheetTitle>
                  <SheetDescription>
                    <span
                      className={`flex flex-col mt-5 mb-6 pt-4 pb-5 gap-6 items-center space-y-3.25 ${geistMono.className}`}
                    >
                      <Link
                        href="/"
                        className=" text-xl w-full text-center hover:text-violet-400"
                      >
                        Home
                      </Link>
                      <Link
                        href="/blog"
                        className="text-xl w-full text-center hover:text-violet-400"
                      >
                        Blog
                      </Link>
                      <Link
                        href="/srtory"
                        className="text-xl w-full text-center hover:text-violet-400"
                      >
                        Story
                      </Link>
                      <Link
                        href="/quiz"
                        className="text-xl w-full text-center hover:text-violet-400"
                      >
                        Quiz
                      </Link>
                      <Link
                        href="/about"
                        className="text-xl w-full text-center hover:text-violet-400"
                      >
                        About
                      </Link>
                      <Link
                        href="/about"
                        className="text-xl w-full text-center hover:text-violet-400"
                      >
                        About
                      </Link>
                      <span className={`flex flex-col w-full mt-7`}>
                        <span
                          className={`text-black dark:text-white text-2xl font-bold ${geistSans.className}`}
                        >
                          Accessibility
                        </span>

                        <span className="flex justify-center mt-5">
                          <Button
                            className={`mx-1 p-5 text-xl text-center w-1/3 ${geistMono.className}`}
                          >
                            Quick S
                          </Button>
                          <MobModeToggle />
                          <Button
                            className={`mx-1 p-5 text-xl text-center w-1/3 ${geistMono.className}`}
                          >
                            Acbubble
                          </Button>
                        </span>
                      </span>
                      <span
                        className={`flex w-full gap-x-1 mt-10 justify-center`}
                      >
                        <Button
                          className={`mx-1 p-5 w-1/2 text-xl text-center ${geistMono.className}`}
                        >
                          Signin
                        </Button>
                        <Button
                          variant="outline"
                          className={`dark:text-white mx-1 p-5 w-1/2 text-xl text-center ${geistMono.className}`}
                        >
                          Signup
                        </Button>
                      </span>
                    </span>
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter className={"pr-0 pl-0"}>
                  <div className="flex p-2 gap-x-2 text-sm justify-center items-center m-0 bg-gray-300 dark:bg-zinc-700">
                    . <Link href={"/about"}> About </Link> .{" "}
                    <Link href={"/contact"}> Contact </Link> .
                    <Link href={"/tandc"}> Terms </Link> .{" "}
                    <Link href={"/privecy"}> Privacy Policy </Link> .
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
