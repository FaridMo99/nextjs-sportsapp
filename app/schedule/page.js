import React from "react";
import { notFound } from "next/navigation";
import getCurrentSeason from "@/lib/getCurrentSeason";
import SelectYear from "@/components/teams/SelectYear";
import ScheduleAccordion from "../../components/schedule/ScheduleAccordion";
import "server-only";
import getData from "@/lib/getData";

export const metadata = {
  title: "Schedule",
  description: "Schedule for all current Teams",
  authors: [{ name: "Farid Mohseni" }],
  openGraph: {
    title: "Schedule | HoopTracker",
    description: "Schedule for all Season Games",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/schedule`,
    siteName: "HoopTracker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule | HoopTracker",
    description: "Schedule for all Season Games",
  },
};

async function page({ searchParams }) {
  const search = await searchParams;
  const currentSeason = await getCurrentSeason();
  const season =
    search.season && Object.keys(search).length > 0
      ? search.season
      : currentSeason;
  const schedule = await getData(
    `https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}`,
  );
  const limit = currentSeason - 1;

  for (const [key, value] of Object.entries(search)) {
    if (
      key !== "season" ||
      parseInt(value) > parseInt(currentSeason) + 1 ||
      parseInt(value) < limit
    ) {
      return notFound();
    }
  }

  if (schedule.length === 0)
    return (
      <p className="w-full flex justify-center mt-4 text-white font-bold text-2xl">
        No Games found...
      </p>
    );

  return (
    <main className="p-4 flex-grow overflow-auto">
      <SelectYear currentSeason={currentSeason.toString()} />
      <ScheduleAccordion schedule={schedule} />
    </main>
  );
}

export default page;
