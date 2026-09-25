import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full h-16 items-center">
      <div className="flex items-center justify-around pt-3 pb-3 bg-amber-500 border-b border-b-gray-300">
        <h3 className="font-bold text-4xl text-violet-500">DiarySpark</h3>

        <div className="hidden md:flex items-center text-lg gap-8 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/trivia">Trivia</Link>
          <Link href="/quest">Quest</Link>
          <Link href="/games">Games</Link>
        </div>


        <div className="flex gap-3 mr-4">
          <button className="px-4 py-1 w-32 font-semibold border rounded-full text-lg">
            Subscribe
          </button>
          <button className="px-4 py-1 w-24 font-semibold border rounded-full text-lg">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
