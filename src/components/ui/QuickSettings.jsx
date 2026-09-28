"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Settings, X } from "lucide-react";

export default function QuickSettings(
  {
    className,
    variant = "outline",
    size = "icon",
    onClick,
    ...props
  },
  ref,
) {
  const [modalOpen, setModalOpen] = useState(false);

  const OpenSettings = () => setModalOpen(true);
  const closeSettings = () => setModalOpen(false);
  return (
    <div className="">
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={OpenSettings}
        className={cn(
          "relative overflow-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
          className,
        )}
        {...props}
      >
        {/* Settings */}
        <Settings
          aria-hidden="true"
          className={cn(
            "h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out text-gray-500",
          )}
        />
      </Button>

      {modalOpen && (
        <div
          className="fixed flex inset-0 bg-black/70 backdrop-blur-xs items-center justify-center"
          onClick={closeSettings}
        >
          {/* Popup Modal for Quick Settings */}
          <div
            className="w-250 h-150 bg-white dark:bg-background p-5 rounded-lg text-gray-800 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between pb-2 border-b">
              <h1 className="text-3xl font-extrabold font-display">
                Quick Settings
              </h1>
              <button
                onClick={closeSettings}
                className="border-none text-lg cursor-pointer"
              >
                <X />
              </button>
            </div>
            <div className="flex flex-col w-full h-118 border-b"></div>

            {/* Settings Save Button */}
            <div className="flex w-full h-15 items-center justify-end">
              <Button
                variant="outline"
                className="w-15 h-9 text-lg font-semibold font-body"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
