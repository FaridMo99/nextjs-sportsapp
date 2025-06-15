import {
  format,
  parseISO,
  getISOWeek,
  getMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";

export default function formatSchedule(schedule) {
  const calendar = {};

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
