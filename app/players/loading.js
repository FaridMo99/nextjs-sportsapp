import { Card } from "@/components/ui/card";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function loading() {
  return (
    <main className="flex flex-col items-center flex-grow overflow-auto p-4 gap-6">
      <Card
        style={{ height: "280px", width: "100%", padding: 0 }}
        className="overflow-clip"
      >
        <div style={{ height: "100%" }}>
          <Skeleton
            height="100%"
            style={{ display: "block", margin: 0, padding: 0 }}
          />
        </div>
      </Card>
      <Card
        style={{ height: "280px", width: "100%", padding: 0 }}
        className="overflow-clip"
      >
        <div style={{ height: "100%" }}>
          <Skeleton
            height="100%"
            style={{ display: "block", margin: 0, padding: 0 }}
          />
        </div>
      </Card>
      <Card
        style={{ height: "280px", width: "100%", padding: 0 }}
        className="overflow-clip"
      >
        <div style={{ height: "100%" }}>
          <Skeleton
            height="100%"
            style={{ display: "block", margin: 0, padding: 0 }}
          />
        </div>
      </Card>
    </main>
  );
}

export default loading;
