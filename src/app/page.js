import { Features } from "@/components/Features";
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
      <Features />
    </div>
  );
}
