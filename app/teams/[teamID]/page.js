import React, { Suspense } from "react";
import getCurrentSeason from "@/lib/getCurrentSeason";
import Schedule from "../../../components/teams/Schedule";
import Roster from "../../../components/teams/Roster";
import SeasonStatistics from "../../../components/teams/SeasonStatistics";
import SelectYear from "../../../components/teams/SelectYear";
import { notFound } from "next/navigation";
import transformTeamName, {
  getTeamAbbreviationById,
} from "@/lib/transformTeamName";
import CardLoader from "@/components/CardLoader";

async function page({ params, searchParams }) {
  const { teamID } = await params;
  if (Number(teamID) > 30 || Number(teamID) < 1) return notFound();
  const currentSeason = await getCurrentSeason();
  const search = await searchParams;
  const season =
    search.season && Object.keys(search).length > 0
      ? search.season
      : currentSeason;

  const abbr = getTeamAbbreviationById(teamID);
  const teamName = transformTeamName(abbr);
  const limit = currentSeason - 1;

  for (const [key, value] of Object.entries(search)) {
    if (
      key !== "season" ||
      parseInt(value) > currentSeason ||
      parseInt(value) < limit
    ) {
      return notFound();
    }
  }

  return (
    <main className="p-4 flex-grow overflow-auto">
      <SelectYear currentSeason={currentSeason} />
      <Suspense fallback={<CardLoader amount={3} />}>
        <Schedule season={season} id={teamID} teamName={teamName} />
        <Roster season={season} id={teamID} teamName={teamName} abbr={abbr} />
        <SeasonStatistics season={season} id={teamID} />
      </Suspense>
    </main>
  );
}

export default page;
