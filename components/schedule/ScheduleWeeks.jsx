import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ScheduleDays from "./ScheduleDays";

const weeks = ["1", "2", "3", "4"];

function ScheduleWeeks({ children }) {
  return (
    <Tabs defaultValue={weeks[0]} className="w-full">
      <TabsList className="flex w-full mb-4 rounded-xs bg-secondary-light border-1 border-black">
        {weeks.map((week) => (
          <TabsTrigger
            className="rounded-xs data-[state=active]:bg-secondary text-white"
            key={week}
            value={week}
          >
            {week}
          </TabsTrigger>
        ))}
      </TabsList>
      {weeks.map((week) => (
        <ScheduleDays key={week} week={week} />
      ))}
    </Tabs>
  );
}

export default ScheduleWeeks;
