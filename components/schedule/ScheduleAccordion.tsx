import React from "react";
import ScheduleWeeks from "./ScheduleWeeks";
import formatSchedule, { type Calendar } from "@/lib/formatSchedule";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Game } from "@/app/types";

function ScheduleAccordion({ schedule }: { schedule: Game[] }) {
  const formattedSchedule: Calendar = formatSchedule(schedule);

  return (
    <Accordion type="multiple" className="w-full">
      {Object.entries(formattedSchedule).map(([monthName, weeksData]) => (
        <div
          key={monthName}
          className="rounded-sm border-secondary-light shadow-md bg-secondary border my-4"
        >
          <AccordionItem className="px-4" value={monthName}>
            <AccordionTrigger className="text-xl font-bold text-white">
              {monthName}
            </AccordionTrigger>
            <AccordionContent>
              <ScheduleWeeks weeksData={weeksData} />
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}

export default ScheduleAccordion;
