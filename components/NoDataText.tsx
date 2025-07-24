import React from "react";

function NoDataText({ text }: { text: string }) {
  return (
    <p className="w-full flex justify-center mt-4 text-white font-bold text-2xl">
      {text}
    </p>
  );
}

export default NoDataText;
