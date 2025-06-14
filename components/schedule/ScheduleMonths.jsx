"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Dezember",
];

function ScheduleMonths({ children }) {
  return (
    <Accordion type="multiple" className="w-full">
      {months.map((month) => (
        <div
          key={month}
          className="rounded-sm border-secondary-light shadow-md bg-secondary border my-4"
        >
          <AccordionItem className="px-4" key={month} value={month}>
            <AccordionTrigger className="text-xl font-bold">
              {month}
            </AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}

export default ScheduleMonths;
