import React from "react";
import { Skeleton } from "./ui/skeleton";

function CardLoader({ amount = 1, big = false }) {
  return (
    <main className="flex flex-col items-center flex-grow overflow-auto p-4 gap-6">
      {Array.from({ length: amount }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={`w-full ${big ? "h-[80vh]" : "h-[280px]"} overflow-clip p-0 rounded-xl`}
        />
      ))}
    </main>
  );
}

export default CardLoader;
