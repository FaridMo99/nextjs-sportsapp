import React from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-8 text-center">
      <XCircle size={64} className="text-yellow-400 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4 text-white">Page Not Found</h1>
      <p className="mb-6 text-gray-300 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been removed.
      </p>
      <Link
        href="/"
        className="bg-secondary text-white px-6 py-3 rounded-md border border-secondary-light"
      >
        Back to Home
      </Link>
    </main>
  );
}

export default NotFound;
