// File: ContentSections.jsx
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const blogCards = [
  {
    title: "React Best Practices",
    description: "Tips and tricks for writing clean React code.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Understanding TypeScript",
    description: "A beginner's guide to TypeScript.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "UI Design Trends 2024",
    description: "What's new in UI/UX this year?",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

const storyCards = [
  {
    title: "Journey to the Mountains",
    description: "An inspiring travel story.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Startup Success",
    description: "How a small idea became a big company.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Learning to Code",
    description: "A personal story of growth and perseverance.",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
];

const quizCards = [
  { title: "React Quiz", description: "Test your React knowledge." },
  { title: "JavaScript Basics", description: "How well do you know JS?" },
  { title: "CSS Mastery", description: "Challenge your CSS skills." },
];

function Section({ title, cards, cardClassName, withImage }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="ghost" size="icon">
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
      <Carousel className={"-z-10"}>
        <CarouselContent>
          {cards.map((card, idx) => (
            <CarouselItem
              key={idx}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className={cardClassName}>
                <CardHeader className="p-0 z-10">
                  {withImage && card.image && (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-48 object-cover mt-0 rounded-t-md rounded-b-md"
                    />
                  )}
                  <div className="p-4">
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{card.description}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-between mt-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}

export default function ContentSections() {
  return (
    <section className="container mx-auto px-4 py-8 z-0">
      <Section
        title="Blogs"
        cards={blogCards}
        cardClassName="w-full h-84"
        withImage={true}
      />
      <Section
        title="Stories"
        cards={storyCards}
        cardClassName="w-full h-96"
        withImage={true}
      />
      <Section
        title="Quiz"
        cards={quizCards}
        cardClassName="w-[350px] h-52"
        withImage={false}
      />
    </section>
  );
}
