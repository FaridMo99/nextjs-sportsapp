import React from "react";
import Image from "next/image";

function loading() {
  return (
    <main className="w-screen h-screen fixed top-0 left-0 overflow-hidden flex justify-center items-center bg-primary z-500">
      <Image
        src="/hooptracker-logo.png"
        alt="hooptracker logo"
        className="animate-pulse"
        width={200}
        height={200}
      />
    </main>
  );
}

export default loading;
