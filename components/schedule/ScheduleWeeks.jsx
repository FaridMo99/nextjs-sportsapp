import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ScheduleDays from "./ScheduleDays";

function ScheduleWeeks({ weeksData }) {
  const weekKeys = Object.keys(weeksData);

  return (
    <Tabs defaultValue={weekKeys[0]} className="w-full">
      <TabsList className="flex justify-evenly gap-4 w-full mb-4 rounded-xs bg-secondary-light border border-black overflow-auto">
        {weekKeys.map((week) => (
          <TabsTrigger
            key={week}
            value={week}
            className="min-w-[100px] px-20 py-2 shrink-0 whitespace-nowrap 
             rounded-xs text-white data-[state=active]:bg-secondary 
             data-[state=active]:outline-1 data-[state=active]:outline-white"
          >
            Week {week}
          </TabsTrigger>
        ))}
      </TabsList>

      {weekKeys.map((week) => (
        <TabsContent key={week} value={week}>
          <ScheduleDays daysData={weeksData[week]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default ScheduleWeeks;
