import React from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { BlogCard } from "./ui/BlogCard";

export const CardContainer = () => {
  return (
    <div className="w-full items-center">
      {/* Blog Section */}
      <div className="flex flex-col w-full min-h-96 p-5 mt-5 md:w-7xl mx-auto rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-2xl font-extrabold font-display">Blogs</h3>

          <Button
            variant="ghost"
            className={`w-8 h-8 rounded-full cursor-pointer`}
          >
            <ChevronRight />
          </Button>
        </div>

        {/* Blog Cards area */}
        <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-2 mt-3 p-3 gap-3">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
        </div>
      </div>

      {/* Trivia Section */}
      <div className="flex flex-col w-full min-h-96 p-5 mt-5 md:w-7xl mx-auto rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-2xl font-extrabold font-display">Trivias</h3>

          <Button
            variant="ghost"
            className={`w-8 h-8 rounded-full cursor-pointer`}
          >
            <ChevronRight />
          </Button>
        </div>

        {/* Trivia Cards area */}
        <div className="grid grid-cols-1 md:grid-cols-4 mt-3 p-3 gap-3"></div>
      </div>

      {/* Quest Section */}
      <div className="flex flex-col w-full min-h-96 p-5 mt-5 md:w-7xl mx-auto rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-2xl font-extrabold font-display">Quests</h3>

          <Button
            variant="ghost"
            className={`w-8 h-8 rounded-full cursor-pointer`}
          >
            <ChevronRight />
          </Button>
        </div>

        {/* Quest Cards area */}
        <div className="grid grid-cols-1 md:grid-cols-4 mt-3 p-3 gap-3"></div>
      </div>
    </div>
  );
};
