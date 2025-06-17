"use client";
import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

function Error() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-8 text-center">
      <AlertTriangle size={64} className="text-red-500 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4 text-white">
        Oops! Something went wrong.
      </h1>
      <Link
        href="/"
        className=" text-white px-6 py-3 rounded-md bg-secondary border border-secondary-light"
      >
        Go back home
      </Link>
    </main>
  );
}

export default Error;
