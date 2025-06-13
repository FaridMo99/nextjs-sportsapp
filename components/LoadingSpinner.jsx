import React from "react";
import { Loader2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="w-full mt-10 flex justify-center items-center">
      <Loader2 className="animate-spin text-secondary" size={100} />
    </div>
  );
}

export default LoadingSpinner;
