"use client";
import { useEffect, useState } from "react";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickSettings() {
  const [open, setOpen] = useState(false);

  // Prevent body scrolling when popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Circular Button */}
      <Button
        variant="outline"
        aria-label="Open quick settings"
        className="bg-background border-none hover:bg-accent transition-all h-8 w-8 rounded-full flex items-center justify-center cursor-pointer select-none"
        onClick={() => setOpen(true)}
        tabIndex={0}
      >
        <Settings className="h-[1.2rem] w-[1.2rem]" aria-hidden />
      </Button>

      {/* Popup Modal */}
      {open && (
        <div
          className="
          fixed -inset-415 z-50 -right-2 -bottom-385
          flex items-center justify-center
          bg-black/25 backdrop-blur
          select-none "
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="
          bg-white dark:bg-neutral-900
          text-gray-900 dark:text-gray-100
            rounded-2xl shadow-2xl
            p-6
            w-full max-w-md min-w-275 min-h-150 overflow-x-auto
            flex flex-col select-none absolute
            focus:outline-none
            "
            onClick={(e) => e.stopPropagation()}
            tabIndex={0}
            role="document"
          >
            <div className="flex items-center justify-between mb-4 border-b">
              <span className="text-2xl font-semibold mb-2">
                Quick Settings
              </span>
              <button
                aria-label="Close"
                className="p-1 rounded-full hover:bg-accent mb-2 focus:outline-none cursor-pointer"
                onClick={() => setOpen(false)}
                tabIndex={0}
              >
                {/* Make sure you have imported your icon correctly */}
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div>{/* ...Quick Settings Content... */}</div>
          </div>
        </div>
      )}
    </>
  );
}
