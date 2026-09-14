import React from "react";
import { ModeToggle } from "./ui/ModeToggle";

export function ActionBar() {
  return (
    <div className="fixed flex h-full items-center z-30 right-3">
      <div className="hidden md:flex md:flex-col w-10 min-h-48 p-1 gap-y-2 items-center bg-background/70 backdrop-blur-lg dark:bg-background/30 shadow-xs dark:shadow-muted rounded-full">
        <ModeToggle />
      </div>
    </div>
  );
}
