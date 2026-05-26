"use client"
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react'
import { ModeToggle } from './ui/modebtn';
import { QuickSettings } from './ui/qsettbtn';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "700",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "500",
});


const ActionBar = () => {
  return (
    <div className="md:flex hidden md:w-full md:h-screen md:justify-end md:pr-2 md:items-center">
      <div className="flex flex-col fixed p-1 w-10 min-h-60 gap-y-3 rounded-full bg-background/50 backdrop-blur shadow-md">
        <ModeToggle />
        <QuickSettings />
      </div>
    </div>
  );
};

export default ActionBar
