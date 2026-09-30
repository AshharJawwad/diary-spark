import React from "react";
import { ModeToggle } from "./ui/ModeBtn";
import { QuickSettings } from "./ui/QuickSettings";
import { InfoBtn } from "./ui/InfoBtn";

export default function ActionBar() {
  return (
    <div className="absolute hidden lg:flex w-full h-full items-center">
      <div className="fixed flex flex-col w-10 px-1 py-1 rounded-full min-h-29 shadow dark:shadow-xs dark:shadow-primary right-3 bg-background z-20">
        <ModeToggle className="rounded-full cursor-pointer" />
        <InfoBtn className="rounded-full cursor-pointer mt-1.5" />
        <QuickSettings variant="outline" className="rounded-full cursor-pointer mt-1.5 text-gray-500" />
      </div>
    </div>
  );
}
