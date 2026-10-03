"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Settings, X } from "lucide-react";

export const QuickSettings = React.forwardRef(function QuickSettings(
  { className, variant, size = "icon", onClick, open, onOpenChange, hideTrigger = false, ...props },
  ref,
) {
  // Open Quick Settings Modal & Active Tabs
  const [internalOpen, setInternalOpen] = useState(false);
  const modalOpen = open ?? internalOpen;
  const setModalOpen = (value) => {
    if (open === undefined) setInternalOpen(value);
    onOpenChange?.(value);
  };
  const [active, setActive] = useState("General");

  const OpenSettings = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) setModalOpen(true);
  };

  const closeSettings = () => setModalOpen(false);

  return (
    <div>
      {!hideTrigger && <Button
        ref={ref}
        variant={variant}
        size={size}
        type="button"
        aria-label="Open quick settings"
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
            "h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out",
          )}
        />
      </Button>}

      {modalOpen && (
        <div
          className="fixed flex inset-0 bg-black/30 backdrop-blur-xs items-center justify-center z-10"
          onClick={closeSettings}
        >
          {/* Popup Modal for Quick Settings */}
          <div
            className="w-full h-full md:w-250 md:h-150 bg-background p-3 md:rounded-lg text-gray-800 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between pb-2">
              <h1 className="text-3xl font-extrabold font-display">
                Quick Settings
              </h1>

              {/* Popup Close */}
              <button
                type="button"
                aria-label="Close quick settings"
                onClick={closeSettings}
                className="border-none text-lg cursor-pointer"
              >
                <X className="w-[1.2rem] h-[1.2rem]" />
              </button>
            </div>

            {/* Settings Area */}
            <div className="flex flex-col w-full h-195 md:h-134 border rounded-lg">
              {/* Quick Settings Tabs */}
              <div className="flex w-full h-10 md:h-10 items-start rounded-t-lg border-b px-4 pt-1.5 gap-x-1">
                <button
                  onClick={() => setActive("General")}
                  className={`text-lg font-body font-normal bottom-0 px-2 py-0.5 cursor-pointer ${active === "General" ? "border-b-2 border-primary text-primary" : "text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary"}`}
                >
                  General
                </button>
                <button
                  onClick={() => setActive("Intelligence")}
                  className={`text-lg font-body font-normal bottom-0 px-2 py-0.5 cursor-pointer ${active === "Intelligence" ? "border-b-2 border-primary text-primary" : "text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary"}`}
                >
                  Intelligence
                </button>
                <button
                  onClick={() => setActive("Notification")}
                  className={`text-lg font-body font-normal bottom-0 px-2 py-0.5 cursor-pointer ${active === "Notification" ? "border-b-2 border-primary text-primary" : "text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary"}`}
                >
                  Notification
                </button>
              </div>

              {/* Quick Settings Tab Pages */}
              <div>
                {/* General Settings */}
                {active === "General" && (
                  <div className="dark:bg-muted-foreground p-3 w-full min-h-185.5 md:min-h-123.5 rounded-b-lg overflow-hidden overflow-y-scroll no-scrollbar">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex flex-col space-y-1.5">
                        <h3 className="text-xl font-bold font-display">
                          Font Size
                        </h3>
                        <p className="text-sm font-normal font-body">
                          Something
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Intelligence Settings */}
                {active === "Intelligence" && (
                  <div className="dark:bg-muted-foreground p-3 w-full min-h-185.5 md:min-h-123.5 rounded-b-lg overflow-hidden overflow-y-scroll no-scrollbar">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex flex-col space-y-1.5">
                        <h3 className="text-xl font-bold font-display">
                          Font Size
                        </h3>
                        <p className="text-sm font-normal font-body">
                          Something
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {active === "Notification" && (
                  <div className="dark:bg-muted-foreground p-3 w-full min-h-185.5 md:min-h-123.5 rounded-b-lg overflow-hidden overflow-y-scroll no-scrollbar">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex flex-col space-y-1.5">
                        <h3 className="text-xl font-bold font-display">
                          Font Size
                        </h3>
                        <p className="text-sm font-normal font-body">
                          Something
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
