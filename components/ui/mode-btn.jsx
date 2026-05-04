// components/ModeSwitchButton.jsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

const modes = [
  {
    value: "system",
    icon: <Laptop className="w-5 h-5 text-orange-600 dark:text-blue-600" />,
    label: "System",
  },
  {
    value: "light",
    icon: <Sun className="w-5 h-5 text-orange-600" />,
    label: "Light",
  },
  {
    value: "dark",
    icon: <Moon className="w-5 h-5 text-blue-600" />,
    label: "Dark",
  },
];

export default function ModeSwitchButton() {
  const { theme, setTheme } = useTheme();
  const [modeIndex, setModeIndex] = useState(0);

  // Set initial mode to system
  useEffect(() => {
    if (theme === "system" || !theme) {
      setModeIndex(0);
    } else if (theme === "light") {
      setModeIndex(1);
    } else if (theme === "dark") {
      setModeIndex(2);
    }
  }, [theme]);

  const handleClick = () => {
    const nextIndex = (modeIndex + 1) % modes.length;
    setModeIndex(nextIndex);
    setTheme(modes[nextIndex].value);
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${modes[(modeIndex + 1) % modes.length].label} mode`}
      onClick={handleClick}
      className="bg-white dark:bg-zinc-900 rounded-full shadow-md hover:shadow-lg transition-shadow p-2 flex items-center justify-center border-0 focus:outline-none cursor-pointer"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
    >
      {modes[modeIndex].icon}
    </button>
  );
}
