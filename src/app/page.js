import { CardContainer } from "@/components/CardContainer";
import { Features } from "@/components/Features";

export const metadata = {
  title: "DiarySpark - Home",
  description: "A platform for gaining knowledge and helping others.",
};

export default function Home() {
  return (
    <div className="items-center w-full">
      {/* Hero Section */}
      <div className="flex flex-col w-full h-96 md:h-155 mt-15 md:mt-16 items-center justify-center bg-background"></div>

      {/* Card Container for Blogs, Trivias, & Quests */}
      <CardContainer />

      {/* Feature Cards */}
      <Features />
    </div>
  );
}
