import React from "react";

function LiveTag() {
  return (
    <div className="absolute top-2 right-2 z-10 flex items-center justify-between w-14">
      <p>Live</p>
      <div className="rounded-full bg-red-600 w-4 h-4 shadow-md shadow-red-500 animate-pulse"></div>
    </div>
  );
}

export default LiveTag;
