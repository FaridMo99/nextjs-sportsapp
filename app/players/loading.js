import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <main className="flex flex-col items-center flex-grow overflow-auto p-4 gap-6">
      <Skeleton className="w-full h-[280px] overflow-clip p-0 rounded-xl" />
      <Skeleton className="w-full h-[280px] overflow-clip p-0 rounded-xl" />
      <Skeleton className="w-full h-[280px] overflow-clip p-0 rounded-xl" />
    </main>
  );
}

export default loading;
