import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "DiarySpark - Home",
  description: "A platform for gaining knowledge and helping others.",
};

export default function Home() {
  return (
    <div className="items-center w-full">
      {/* Hero Section */}
      <div className="flex flex-col w-full h-96 md:h-155 mt-15 md:mt-16 items-center justify-center bg-background"></div>

      {/* Blogs Section */}
      <div className="flex flex-col w-full min-h-96 p-5 mt-5 md:w-7xl mx-auto rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-2xl font-extrabold font-display">Blogs</h3>

          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full cursor-pointer"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Trivia Section */}
      <div className="flex flex-col w-full min-h-96 p-5 mt-5 md:w-7xl mx-auto rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-2xl font-extrabold font-display">Trivia</h3>

          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full cursor-pointer"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Quest Section */}
      <div className="flex flex-col w-full min-h-96 p-5 mt-5 md:w-7xl mx-auto rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-2xl font-extrabold font-display">Quests</h3>

          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full cursor-pointer"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="w-full mx-auto pt-8 pb-8 md:pt-12 md:pb-12 border-t border-b mt-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="w-full h-96 md:h-155 justify-center bg-background">
            <div className="flex flex-col h-full items-center justify-center gap-6">
              <span className="text-xs text-center font-body border rounded-sm px-1.5 py-0.5">
                Blogs
              </span>
              <h3 className="font-display font-semibold text-center text-3xl md:text-4xl text-gray-800 dark:text-gray-200">
                For Readers
                <span className="flex flex-col">Knowledge That Matters</span>
              </h3>
              <Button className="py-5 px-6 rounded-full text-lg mt-8 cursor-pointer">
                Read Blogs
              </Button>
            </div>
          </div>
          <div className="w-full h-96 md:h-155 justify-center bg-background">
            <div className="flex flex-col h-full items-center justify-center gap-6">
              <span className="text-xs text-center font-body border rounded-sm px-1.5 py-0.5">
                Trivia
              </span>
              <h3 className="font-display font-semibold text-center text-3xl md:text-4xl text-gray-800 dark:text-gray-200">
                For Readers
                <span className="flex flex-col">Knowledge That Matters</span>
              </h3>
              <Button
                variant="outline"
                className="py-5 px-6 rounded-full text-lg mt-8 cursor-pointer"
              >
                View Trivia
              </Button>
            </div>
          </div>
          <div className="w-full h-96 md:h-155 justify-center bg-background">
            <div className="flex flex-col h-full items-center justify-center gap-6">
              <span className="text-xs text-center font-body border rounded-sm px-1.5 py-0.5">
                Blogs
              </span>
              <h3 className="font-display font-semibold text-center text-3xl md:text-4xl text-gray-800 dark:text-gray-200">
                For Readers
                <span className="flex flex-col">Knowledge That Matters</span>
              </h3>
              <Button className="py-5 px-6 rounded-full text-lg mt-8 cursor-pointer">
                Read Blogs
              </Button>
            </div>
          </div>
          <div className="w-full h-96 md:h-155 justify-center bg-background">
            <div className="flex flex-col h-full items-center justify-center gap-6">
              <span className="text-xs text-center font-body border rounded-sm px-1.5 py-0.5">
                Blogs
              </span>
              <h3 className="font-display font-semibold text-center text-3xl md:text-4xl text-gray-800 dark:text-gray-200">
                For Readers
                <span className="flex flex-col">Knowledge That Matters</span>
              </h3>
              <Button className="py-5 px-6 rounded-full text-lg mt-8 cursor-pointer">
                Read Blogs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
