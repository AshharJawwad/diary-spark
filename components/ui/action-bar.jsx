// components/VerticalActionBar.jsx
"use client";

import { useState } from "react";
import { Home, Bell, User, Info, Settings, X } from "lucide-react";

export default function ActionBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Vertical Action Bar */}
      <div className="w-10 flex flex-col m-2 gap-4 z-20 rounded-full shadow-md hover:shadow-lg transition-shadow bg-background/80 backdrop-blur-md">
        <button className="rounded-full p-2 mt-2 flex items-center justify-center border-0 focus:outline-none cursor-pointer">
          <Home className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button className="rounded-full p-2 flex items-center justify-center border-0 focus:outline-none cursor-pointer">
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button className="rounded-full p-2 flex items-center justify-center border-0 focus:outline-none cursor-pointer">
          <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button className="rounded-full p-2 flex items-center justify-center border-0 focus:outline-none cursor-pointer">
          <Info className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          className="rounded-full p-2 mb-2 flex items-center justify-center border-0 focus:outline-none cursor-pointer"
          onClick={() => setOpen(true)}
          aria-label="Open Quick Settings"
        >
          <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* Blurred Background */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all"
            onClick={() => setOpen(false)}
          />
          {/* Modal Content */}
          <div className="relative z-50 bg-white rounded-2xl w-full max-w-4xl mx-4 md:mx-0 md:w-2/3 h-3/4 flex flex-col shadow-lg">
            <div className="flex items-center border-b px-6 py-4">
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800">
                Quick Settings
              </h2>
              {/* Close Icon */}
              <button
                className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none ml-auto cursor-pointer"
                onClick={() => setOpen(false)}
                aria-label="Close Quick Settings"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-6">
              {/* Modal body content goes here */}
              <p className="text-gray-500">Your quick settings content here.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
