import React from "react";
import { notFound } from "next/navigation";
import { getCurrentSeasonCached } from "@/lib/getCurrentSeason";
import SelectYear from "@/components/teams/SelectYear";
import ScheduleAccordion from "@/components/schedule/ScheduleAccordion";
import "server-only";
import getData from "@/lib/getData";
import NoDataText from "@/components/NoDataText";

export async function generateStaticParams() {
  const currentSeason = await getCurrentSeasonCached();
  const limit = currentSeason - 1;

  return [{ season: String(currentSeason) }, { season: String(limit) }];
}

export const revalidate = 43200;

export async function generateMetadata({ params }) {
  const { season } = await params;
  return {
    title: "Schedule",
    description: `Schedule for all current Teams in ${season}`,
    authors: [{ name: "Farid Mohseni" }],
    openGraph: {
      title: "Schedule | HoopTracker",
      description: `Schedule for all ${season} Season Games`,
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/schedule`,
      siteName: "HoopTracker",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Schedule | HoopTracker",
      description: `Schedule for all ${season} Season Games`,
    },
  };
}

async function page({ params }) {
  const { season } = await params;
  const seasonAsNumber = Number(season);
  const currentSeason = await getCurrentSeasonCached();
  const limit = currentSeason - 1;

  if (
    seasonAsNumber > currentSeason ||
    seasonAsNumber < limit ||
    isNaN(seasonAsNumber)
  )
    return notFound();

  const schedule = await getData(
    `https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}`,
  );

  if (schedule.length === 0) return <NoDataText text="No Games found..." />;

  return (
    <main className="p-4 flex-grow overflow-auto">
      <SelectYear
        currentSeason={currentSeason}
        chosenSeason={season}
        path="schedule"
      />
      <ScheduleAccordion schedule={schedule} />
    </main>
  );
}

export default page;
