import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

function getDaysForWeek(weekNumber) {
  const start = (parseInt(weekNumber) - 1) * 7 + 1;
  const end = Math.min(start + 6, 31);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function ScheduleDays({ week }) {
  const days = getDaysForWeek(week);

  return (
    <TabsContent
      value={week}
      className="flex justify-evenly gap-2 flex-col md:flex-row items-center"
    >
      {days.map((day) => (
        <Card
          key={day}
          className="rounded-xs border-black bg-secondary-light h-[20vh] md:h-40 w-full flex justify-center items-center"
        >
          <CardContent>Day {day}</CardContent>
        </Card>
      ))}
    </TabsContent>
  );
}

export default ScheduleDays;
