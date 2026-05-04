import { Button } from "./ui/button";
import HeroImg from "../public/Hero-Image2.png";

const Hero = () => {
  return (
    <div className="container m-auto rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Text Section */}
        <div className="space-y-6 flex flex-col justify-center text-center md:text-left items-center md:items-start py-20 px-8 md:pr-60 md:py-0 md:px">
          <h1 className="text-4xl xl:text-5xl font-bold">
            Unlock Your{" "}
            <span className="text-gray-500 underline">Curiosity</span> and
            Explore
          </h1>
          <p>Read blogs, Learn from Quizes and Stories and Play Brain Games</p>
          <Button className={"py-4 px-3 hover:bg-violet-500"}>
            News Letter
          </Button>
        </div>
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={HeroImg}
            className="w-[80%] md:w-[550px] xl:w-[600px]"
            alt="Hero img"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
