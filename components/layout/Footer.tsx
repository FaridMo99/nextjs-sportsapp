import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-4 border-t border-t-secondary-light bg-secondary flex flex-col items-center justify-center text-xs text-gray-300 gap-2 z-100">
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
