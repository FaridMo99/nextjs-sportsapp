import React, { Suspense } from "react";
import getCurrentSeason from "@/lib/getCurrentSeason";
import Schedule from "../../../components/teams/Schedule";
import Roster from "../../../components/teams/Roster";
import SeasonStatistics from "../../../components/teams/SeasonStatistics";
import SelectYear from "../../../components/teams/SelectYear";
import { notFound } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import transformTeamName, {
  getTeamAbbreviationById,
} from "@/lib/transformTeamName";

async function page({ params, searchParams }) {
  const { teamID } = await params;
  //const currentSeason = await getCurrentSeason()
  const search = await searchParams;
  const currentSeason = "2024"; //remove later
  const season =
    search.season && Object.keys(search).length > 0
      ? search.season
      : currentSeason;

  const abbr = getTeamAbbreviationById(teamID);
  const teamName = transformTeamName(abbr);

  for (const [key, value] of Object.entries(search)) {
    if (
      key !== "season" ||
      parseInt(value) > currentSeason ||
      parseInt(value) < 1950
    ) {
      return notFound();
    }
  }

  return (
    <main className="p-4 flex-grow overflow-auto">
      <SelectYear currentSeason={currentSeason} />
      <Suspense fallback={<LoadingSpinner />}>
        <Schedule season={season} id={teamID} teamName={teamName} />
        <Roster season={season} id={teamID} teamName={teamName} abbr={abbr} />
        <SeasonStatistics season={season} id={teamID} />
      </Suspense>
    </main>
  );
}

export default page;
//past years not allowed so fix that
