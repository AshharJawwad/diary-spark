import { Lightbulb, SquareText } from 'lucide-react';
import React from 'react'

export const Features = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-56 md:w-7xl mx-auto rounded-lg p-4 gap-4">
        {/* Blogs Section */}
        <div className="flex flex-col w-96 h-50 dark:bg-muted-foreground items-center justify-center text-blue-500 rounded-lg shadow p-3">
            <div className="flex h-14 w-14 rounded-full justify-center items-center top-0 text-center bg-muted"><SquareText className="h-8 w-8"  /></div>
            <h3 className="text-lg font-semibold font-display mt-5">Blogs</h3>
            <p className="text-base font-base font-body mt-3 text-center text-gray-400">Get knowledge about what&apos;s happening in the Tech, and more!</p>
        </div>

        {/* Trivia Section */}
        <div className="flex flex-col w-96 h-50 dark:bg-muted-foreground items-center justify-center text-yellow-500 rounded-lg shadow p-3">
            <div className="flex h-14 w-14 rounded-full justify-center items-center top-0 text-center bg-muted"><Lightbulb className="h-8 w-8" /></div>
            <h3 className="text-lg font-semibold font-display mt-5">Trivias</h3>
            <p className="text-base font-base font-body mt-3 text-center text-gray-400">Test your knowledge with fun and engaging trivia questions!</p>
        </div>

        {/* Quests Section */}
        <div className="flex flex-col w-96 h-50 dark:bg-muted-foreground items-center justify-center text-green-500 rounded-lg shadow p-3">
            <div className="flex h-14 w-14 rounded-full justify-center items-center top-0 text-center bg-muted"><SquareText className="h-8 w-8"  /></div>
            <h3 className="text-lg font-semibold font-display mt-5">Quests</h3>
            <p className="text-base font-base font-body mt-3 text-center text-gray-400">Embark on exciting quests and challenges to test your skills!</p>
        </div>

        {/* Community Section */}
        <div className="flex flex-col w-96 h-50 dark:bg-muted-foreground items-center justify-center text-purple-500 rounded-lg shadow p-3">
            <div className="flex h-14 w-14 rounded-full justify-center items-center top-0 text-center bg-muted"><SquareText className="h-8 w-8"  /></div>
            <h3 className="text-lg font-semibold font-display mt-5">Communities</h3>
            <p className="text-base font-base font-body mt-3 text-center text-gray-400">Connect with like-minded individuals and participate in discussions!</p>
        </div>
    </div>
  )
}
