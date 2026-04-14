import Link from "next/link";
import { Menu } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ui/theme-btn";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center sticky justify-around px-6 py-4 top-0 border-b bg-background/80 backdrop-blur-md">
      {/* Logo */}
      <Link href={"/"}>
        <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          DiarySpark
        </div>
      </Link>

      {/* Navigation Menu*/}
      <div className="hidden md:flex space-x-8 items-center text-gray-700 dark:text-white">
        <Link href="/" className="text-lg font-semibold">
          Home
        </Link>
        <Link href="/blog" className="text-lg font-semibold">
          Blog
        </Link>
        <Link href="/story" className="text-lg font-semibold">
          Story
        </Link>
        <Link href="/quiz" className="text-lg font-semibold">
          Quiz
        </Link>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        <Button className="hidden md:block px-4 py-2 text-center rounded-md border-b text-white hover:bg-violet-600 transition">
          Register/SignIn
        </Button>

        <div className="hidden"></div>
        <ModeToggle />

        <div className="block md:hidden items-center">
          {/* Tab and Mobile Navigatiopn Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-gray-600">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className={"text-2xl font-bold my-3 p-4"}>
                  DiarySpark
                </SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col gap-8 w-full text-center my-4">
                    <Link href="/" className="text-sm font-semibold">
                      Home
                    </Link>
                    <Link href="/blog" className="text-sm font-semibold">
                      Blog
                    </Link>
                    <Link href="/story" className="text-sm font-semibold">
                      Story
                    </Link>
                    <Link href="/quiz" className="text-sm font-semibold">
                      Quiz
                    </Link>
                    <div className="h-18 w-full my-10 p-4 justify-center items-center">
                      <div className="text-start text-lg font-bold">
                        Accessibility
                      </div>
                    </div>
                    <div className="flex mt-12 w-full h-8 p-4 justify-center items-center">
                      <Button className="mx-1 w-1/2 text-xs px-4 py-2 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition">
                        Register
                      </Button>
                      <Button className="mx-1 w-1/2 text-xs px-4 py-2 rounded-md hover:bg-violet-600 transition">
                        SignIn
                      </Button>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
