import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-16 items-center w-full ">
      <div className="flex flex-col w-full min-h-96 p-5 mt-5 md:w-7xl bg-background mx-auto rounded-lg shadow">
        <div className="flex justify-between">
          <h3 className="text-2xl font-extrabold font-display">Blogs</h3>

          <Button variant="outline" className="w-8 h-8 rounded-full cursor-pointer z-10"><ChevronRight /></Button>
        </div>
      </div>
    </div>
  )
}
