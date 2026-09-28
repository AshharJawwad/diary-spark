import React from "react";
import { ModeToggle } from "./ui/ModeBtn";
import QuickSettings from "./ui/QuickSettings";

export default function ActionBar() {
  return (
    <div className="absolute flex w-full h-full items-center">
      <div className="fixed hidden lg:flex lg:flex-col w-10 px-1 py-1 rounded-full min-h-72 shadow dark:shadow-xs dark:shadow-primary right-3 bg-background z-20">
        <ModeToggle className="rounded-full cursor-pointer" />
        <QuickSettings className="rounded-full cursor-pointer mt-1.5" />
      </div>
    </div>
  );
}
