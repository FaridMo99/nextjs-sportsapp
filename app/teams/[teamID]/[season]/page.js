import React, { Suspense } from "react";
import { getCurrentSeasonCached } from "@/lib/getCurrentSeason";
import Schedule from "@/components/teams/Schedule";
import Roster from "@/components/teams/Roster";
import SeasonStatistics from "@/components/teams/SeasonStatistics";
import SelectYear from "@/components/teams/SelectYear";
import { notFound } from "next/navigation";
import transformTeamName, {
  getTeamAbbreviationById,
} from "@/lib/transformTeamName";
import CardLoader from "@/components/CardLoader";

export async function generateStaticParams() {
  const currentSeason = await getCurrentSeasonCached();
  const limit = currentSeason - 1;
  const params = [];
  for (let teamID = 1; teamID <= 30; teamID++) {
    for (let season = limit; season <= currentSeason; season++) {
      params.push({ teamID: String(teamID), season: String(season) });
    }
  }
  return params;
}

export const revalidate = 43200;

export async function generateMetadata({ params }) {
  const { teamID, season } = params;

  const abbr = getTeamAbbreviationById(teamID);
  const teamName = transformTeamName(abbr);

  return {
    title: teamName,
    description: `Season schedule, roster, and stats for ${teamName} in ${season}.`,
    authors: [{ name: "Farid Mohseni" }],
    openGraph: {
      title: `${teamName} | HoopTracker`,
      description: `Season schedule, roster, and stats for ${teamName} in ${season}.`,
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/teams/${teamID}/${season}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${teamName} | HoopTracker`,
      description: `Season schedule, roster, and stats for ${teamName} in ${season}.`,
    },
  };
}

async function page({ params }) {
  const { teamID, season } = await params;
  if (Number(teamID) > 30 || Number(teamID) < 1) return notFound();
  const currentSeason = await getCurrentSeasonCached();
  const limit = currentSeason - 1;
  const seasonAsNumber = Number(season);

  if (
    seasonAsNumber > currentSeason ||
    seasonAsNumber < limit ||
    isNaN(seasonAsNumber)
  )
    return notFound();

  const abbr = getTeamAbbreviationById(teamID);
  const teamName = transformTeamName(abbr);

  return (
    <main className="p-4 flex-grow overflow-auto">
      <SelectYear
        currentSeason={currentSeason}
        chosenSeason={season}
        path="teams"
        nestedPath={teamID}
      />
      <Suspense fallback={<CardLoader amount={3} />}>
        <Schedule season={season} id={teamID} teamName={teamName} />
        <Roster season={season} id={teamID} teamName={teamName} abbr={abbr} />
        <SeasonStatistics season={season} id={teamID} />
      </Suspense>
    </main>
  );
}

export default page;
