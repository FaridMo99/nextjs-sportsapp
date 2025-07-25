"use client";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
  const path = usePathname();
  const [buildTime,setBuildTime] = useState("")
  useEffect(() => {
    setBuildTime(new Date().toLocaleDateString())
  },[])

  const renderPatterns = [
    /^\/leaders(\/[^\/]+)?$/,
    /^\/schedule(\/[^\/]+)?$/,
    /^\/players(\/[^\/]+)?$/,
    /^\/teams\/[^\/]+(\/[^\/]+)?$/,
  ];

  const shouldRender = renderPatterns.some((pattern) => pattern.test(path));

  return (
    <footer className="relative w-full py-4 border-t border-t-secondary-light bg-secondary flex flex-col items-center justify-center text-xs text-gray-300 gap-2">
      {shouldRender && (
        <p className="absolute top-2 right-2">Last updated: {buildTime}</p>
      )}
      <div className="flex items-center gap-4">
        <Link
          href="https://github.com/FaridMo99"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={30} className="hover:opacity-80 transition-opacity" />
        </Link>
      </div>

      <p className="text-center">
        Data provided by{" "}
        <Link
          href="https://sportsdata.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          SportsDataIO
        </Link>{" "}
        · AI Assistant powered by{" "}
        <Link
          href="https://openai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          OpenAI
        </Link>
      </p>

      <p className="text-center text-[0.65rem] text-gray-400 max-w-xs">
        This site is not affiliated with or endorsed by the NBA, its teams, or
        players. All trademarks are property of their respective owners.
      </p>
    </footer>
  );
}

//give different disclaimer for /players since its 4 weeks
