import Image from "next/image";

export const BlogCard = () => {
  return (
    <div className="relative flex w-full max-w-72 min-h-80 flex-col justify-end mt-4 p-3 rounded-lg shadow-md">
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <Image
          src="/images/blogimage.jpg"
          alt="A video editor working at a desk with multiple monitors"
          fill
          sizes="(max-width: 320px) 100vw, 288px"
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="relative w-full pt-28 space-y-3">
        <div className="flex items-center justify-center text-xs w-fit px-2 min-h-4 rounded-full bg-green-200 border border-green-500 text-green-800">
          Lifestyle
        </div>
        <div className="w-full rounded-lg p-2 bg-background">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-display font-extrabold">
              How to be Happy?
            </h2>

            <p className="text-sm text-muted-foreground font-body">
              Sometimes we will be sad and that&apos;s all right!
            </p>

            <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1">
              <div className="text-sm text-muted-foreground font-body">
                By Ashhar Jawwad
              </div>

              <time dateTime="2026-10-13" className="text-sm text-muted-foreground font-body">
                13th Oct 2026
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
