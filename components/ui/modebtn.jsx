"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";

const modes = [
  {
    theme: "light",
    icon: <Sun className="h-[1.2rem] w-[1.2rem] text-amber-600" />,
    label: "Light",
  },
  {
    theme: "dark",
    icon: <Moon className="h-[1.2rem] w-[1.2rem] text-blue-600" />,
    label: "Dark",
  },
  {
    theme: "system",
    icon: <Monitor className="h-[1.2rem] w-[1.2rem] text-emerald-600" />,
    label: "System",
  },
];

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  // Find current mode; fallback to 'system'
  const currentIndex =
    modes.findIndex((m) => m.theme === theme) === -1
      ? 2
      : modes.findIndex((m) => m.theme === theme);

  const handleToggle = () => {
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setTheme(nextMode.theme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      aria-label={`Toggle theme (current: ${modes[currentIndex].label})`}
      className={`rounded-full border-none cursor-pointer`}
    >
      {modes[currentIndex].icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function MobModeToggle() {
  const { theme, setTheme } = useTheme();
  // Find current mode; fallback to 'system'
  const currentIndex =
    modes.findIndex((m) => m.theme === theme) === -1
      ? 2
      : modes.findIndex((m) => m.theme === theme);

  const handleToggle = () => {
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setTheme(nextMode.theme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      aria-label={`Toggle theme (current: ${modes[currentIndex].label})`}
      className={`mx-1 p-5 dark:text-white text-xl text-center w-1/3`}
    >
      {modes[currentIndex].icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
