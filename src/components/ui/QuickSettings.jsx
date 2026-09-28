"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

export default function QuickSettings({
  className,
  variant = "outline",
  size = "icon",
  onClick,
  ...props
}) {
  const [openModal, setOpenModal] = useState(false);

  const OpenSettings = () => {};
  return (
    <Button
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
  );
}
