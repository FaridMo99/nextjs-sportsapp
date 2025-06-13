import React, { Suspense } from "react";
import getCurrentSeason from "@/lib/getCurrentSeason";
import Schedule from "../../../components/teams/Schedule";
import Roster from "../../../components/teams/Roster";
import SeasonStatistics from "../../../components/teams/SeasonStatistics";
import SelectYear from "../../../components/teams/SelectYear";
import { notFound } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

async function page({ params, searchParams }) {
  const { teamID } = await params;
  //const currentSeason = await getCurrentSeason()
  const search = await searchParams;
  const currentSeason = "2024"; //remove later
  const season =
    search.season && Object.keys(searchParams).length > 0
      ? search.season
      : currentSeason;

  for (const [key, value] of Object.entries(search)) {
    if (key !== "season" || parseInt(value) > currentSeason) {
      return notFound();
    }
  }

  return (
    <main className="p-6 w-full">
      <SelectYear currentSeason={currentSeason} />
      <Suspense fallback={<LoadingSpinner />}>
        <Schedule season={season} />
        <Roster season={season} />
        <SeasonStatistics season={season} id={teamID} />
      </Suspense>
    </main>
  );
}

export default page;

//sections:
// schedule,
// roster,
// stats
//overall season stats with arrow on side, clicking on arrow opens all games
//each game is a link to schedule/[id]

//schedules
//Home and away teams, date and time, season type and week etc. are included. Also includes gameday information. This includes full stadium information (capacity, lat/long, surface etc.), top-line betting information (spread, moneyline, total), weather conditions, and broadcast information.
//https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}
//filter this to get only current teams games

//player details by team (roster)
//Full player bio and details, including injury notes, for all available players by team.
//https://api.sportsdata.io/v3/nba/scores/json/Players/${team}?key=${process.env.API_KEY}
//team as abbreviation like lakers should be LAL
//look how to implement for seasons that arent the current
