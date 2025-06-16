"use client";
import React from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function QuarterTabs({ quarters, hometeam, awayteam, hometeamId, awayteamId }) {
  return (
    <Tabs as="section" defaultValue={quarters[0]?.Name} className="w-full mt-6">
      <TabsList className="flex items-center justify-evenly bg-secondary border-1 border-secondary-light">
        {quarters.map((q) => (
          <TabsTrigger
            key={q.QuarterID}
            value={q.Name}
            className="text-white data-[state=active]:bg-secondary 
             data-[state=active]:outline-1 data-[state=active]:outline-white"
          >
            Q{q.Number}
          </TabsTrigger>
        ))}
      </TabsList>

      {quarters.map((q) => (
        <TabsContent key={q.QuarterID} value={q.Name}>
          <div className="p-4 bg-secondary border-1 border-secondary-light rounded-xl shadow-md">
            <div className="flex justify-between font-bold text-lg mb-2">
              <Link
                href={`/teams/${awayteamId}`}
                className="hover:underline text-white"
              >
                {awayteam}
              </Link>
              <span className="text-white">{q.AwayScore}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <Link
                href={`/teams/${hometeamId}`}
                className="hover:underline text-white"
              >
                {hometeam}
              </Link>
              <span className="text-white">{q.HomeScore}</span>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default QuarterTabs;
