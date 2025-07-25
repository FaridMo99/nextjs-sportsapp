import { Game } from "@/app/types";
import { format, parseISO, startOfWeek, endOfWeek } from "date-fns";

export type Calendar = Record<string, Record<string, Record<string, Game[]>>>;

export default function formatSchedule(schedule: Game[]): Calendar {
  const calendar: Calendar = {};

  schedule.forEach((game) => {
    const date = parseISO(game.DateTimeUTC);
    const monthKey = format(date, "MMMM yyyy");
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
    const weekKey = `${format(weekStart, "MM.dd")} - ${format(weekEnd, "MM.dd")}`;
    const dayKey = format(date, "yyyy-MM-dd");

    if (!calendar[monthKey]) {
      calendar[monthKey] = {};
    }

    if (!calendar[monthKey][weekKey]) {
      calendar[monthKey][weekKey] = {};
    }

    if (!calendar[monthKey][weekKey][dayKey]) {
      calendar[monthKey][weekKey][dayKey] = [];
    }

    calendar[monthKey][weekKey][dayKey].push(game);
  });

  return calendar;
}
