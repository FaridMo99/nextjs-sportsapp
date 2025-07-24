import React from "react";

function BotDotsLoading() {
  return (
    <div className="flex gap-1 ml-2 animate-pulse">
      <div
        className="w-2 h-2 bg-white rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-2 h-2 bg-white rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 bg-white rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}

export default BotDotsLoading;
