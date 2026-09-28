import React from "react";
import { ModeToggle } from "./ui/ModeBtn";
import QuickSettings from "./ui/QuickSettings";

export default function ActionBar() {
  return (
    <div className="absolute flex w-full h-full items-center">
      <div className="fixed hidden lg:block z-30 w-10 justify-center px-1 py-1 rounded-full min-h-72 shadow right-3 bg-background">
        <ModeToggle className="rounded-full cursor-pointer" />
        <QuickSettings className="rounded-full cursor-pointer mt-1.75" />
      </div>
    </div>
  );
}
