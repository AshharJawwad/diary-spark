import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/ModeBtn";

export default function Navbar() {
  return (
    <nav className="fixed w-full h-16 items-center">
      <div className="flex items-center justify-around pt-3 pb-3 bg-amber-500 border-b border-b-gray-300">
        <h3 className="font-extrabold text-4xl text-violet-500 font-display">
          DiarySpark
        </h3>

        <div className="hidden lg:flex items-center text-lg gap-8 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/trivia">Trivia</Link>
          <Link href="/quest">Quest</Link>
          <Link href="/games">Games</Link>
        </div>

        <div className="flex gap-3 mr-4">
          <ModeToggle />
          <Button className="px-4 py-1 w-32 font-semibold border rounded-full text-lg text-center">
            Subscribe
          </Button>
          <Button className="px-4 py-1 w-24 font-semibold border rounded-full text-lg">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}
