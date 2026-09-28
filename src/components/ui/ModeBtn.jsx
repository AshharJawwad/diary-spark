"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Detect client-side mounting safely without cascading render warnings
function useMounted() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const THEMES = ["light", "dark", "system"];

const THEME_CONFIG = {
  light: {
    label: "Light",
    next: "dark",
    description: "Switch to dark theme",
    Icon: Sun,
    activeClasses: "rotate-0 scale-100 opacity-100",
    inactiveClasses: "-rotate-90 scale-0 opacity-0 absolute",
  },
  dark: {
    label: "Dark",
    next: "system",
    description: "Switch to system theme",
    Icon: Moon,
    activeClasses: "rotate-0 scale-100 opacity-100",
    inactiveClasses: "rotate-90 scale-0 opacity-0 absolute",
  },
  system: {
    label: "System",
    next: "light",
    description: "Switch to light theme",
    Icon: Laptop,
    activeClasses: "rotate-0 scale-100 opacity-100",
    inactiveClasses: "rotate-180 scale-0 opacity-0 absolute",
  },
};

export const ModeToggle = React.forwardRef(function ModeToggle(
  {
    className,
    variant = "outline",
    size = "icon",
    showLabel = false,
    onClick,
    onKeyDown,
    disabled,
    ...props
  },
  ref,
) {
  const { theme = "system", setTheme } = useTheme();
  const mounted = useMounted();

  const currentTheme = THEMES.includes(theme) ? theme : "system";
  const currentConfig = THEME_CONFIG[currentTheme];
  const nextTheme = currentConfig.next;
  const nextConfig = THEME_CONFIG[nextTheme];

  const cycleTheme = (event) => {
    setTheme(nextTheme);
    onClick?.(event);
  };

  // Keyboard navigation support: Arrow keys & Home/End
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setTheme(nextTheme);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prevTheme =
        currentTheme === "light"
          ? "system"
          : currentTheme === "dark"
            ? "light"
            : "dark";
      setTheme(prevTheme);
    } else if (event.key === "Home") {
      event.preventDefault();
      setTheme("light");
    } else if (event.key === "End") {
      event.preventDefault();
      setTheme("system");
    }
    onKeyDown?.(event);
  };

  // SSR / Hydration placeholder with matching layout footprint
  if (!mounted) {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled
        aria-hidden="true"
        className={cn("relative overflow-hidden transition-colors", className)}
        {...props}
      >
        <span className="h-[1.2rem] w-[1.2rem]" />
        {showLabel && <span className="ml-2">Theme</span>}
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={cycleTheme}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Current theme: ${currentConfig.label}. Press to switch to ${nextConfig.label} theme.`}
      aria-pressed={currentTheme !== "system"}
      className={cn(
        "relative overflow-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
        className,
      )}
      {...props}
    >
      {/* Light Mode Icon */}
      <Sun
        aria-hidden="true"
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out text-amber-500",
          currentTheme === "light"
            ? THEME_CONFIG.light.activeClasses
            : THEME_CONFIG.light.inactiveClasses,
        )}
      />

      {/* Dark Mode Icon */}
      <Moon
        aria-hidden="true"
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out text-blue-500",
          currentTheme === "dark"
            ? THEME_CONFIG.dark.activeClasses
            : THEME_CONFIG.dark.inactiveClasses,
        )}
      />

      {/* System Mode Icon */}
      <Laptop
        aria-hidden="true"
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out text-green-500",
          currentTheme === "system"
            ? THEME_CONFIG.system.activeClasses
            : THEME_CONFIG.system.inactiveClasses,
        )}
      />

      {/* Optional visible text label for menus or settings bars */}
      {showLabel && (
        <span className="ml-2 font-medium capitalize">
          {currentConfig.label}
        </span>
      )}

      {/* Live region for screen readers when theme changes */}
      <span className="sr-only" aria-live="polite">
        {currentConfig.label} theme enabled
      </span>
    </Button>
  );
});

ModeToggle.displayName = "ModeToggle";
