import Image from "next/image";
import React from "react";

export const BlogCard = () => {
  return (
    <div className="w-72 h-80 justify-center items-center p-3 mt-4 rounded-lg shadow-md bg-no-repeat">
      <Image
        src="/public/images/blog-image"
        alt="blog_image"
        width={72}
        height={80}
        className="object-cover"
      />

      <div className="w-full h-36 mt-17 space-y-3">
          <div className="flex items-center justify-center text-xs w-14 h-4 rounded-full bg-green-200 border border-green-500 text-green-500">
            Lifestyle
          </div>
        <div className="w-full h-30 rounded-lg bottom-3 p-2">
          <div className="relative flex flex-col space-y-2">
            <h2 className="text-xl font-display font-extrabold">
              How to be Happy?
            </h2>

            <p className="text-sm text-gray-400 font-body">Sometime we will be sad and that&apos;s all right!</p>

            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400 font-body">By Ashhar Jawwad</div>

                <span className="text-sm text-gray-400 font-body">13th Oct 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
