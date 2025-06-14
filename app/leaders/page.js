import SelectYear from "@/components/teams/SelectYear";
import React from "react";
import getCurrentSeason from "@/lib/getCurrentSeason";
import StatleadersSection from "./StatleadersSection";
import getStatLeaders from "@/lib/getStatLeaders";
import "server-only";

async function page({ searchParams }) {
  const search = await searchParams;
  const currentSeason = "2024"; //remove later
  const season =
    search.season && Object.keys(search).length > 0
      ? search.season
      : currentSeason;

  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season}?key=${process.env.API_KEY}`,
  );
  const allPlayersSeasonStats = await res.json();
  const statLeaders = getStatLeaders(allPlayersSeasonStats);
  //const currentSeason = getCurrentSeason()

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
      <StatleadersSection leader={statLeaders.total.points} stat="Points" />
      <StatleadersSection
        leader={statLeaders.perGame.pointsPerGame}
        stat="PPG"
      />

      <StatleadersSection leader={statLeaders.total.assists} stat="Assists" />
      <StatleadersSection
        leader={statLeaders.perGame.assistsPerGame}
        stat="APG"
      />

      <StatleadersSection leader={statLeaders.total.rebounds} stat="Rebounds" />
      <StatleadersSection
        leader={statLeaders.perGame.reboundsPerGame}
        stat="RPG"
      />

      <StatleadersSection leader={statLeaders.total.steals} stat="Steals" />
      <StatleadersSection
        leader={statLeaders.perGame.stealsPerGame}
        stat="SPG"
      />

      <StatleadersSection leader={statLeaders.total.blocks} stat="Blocks" />
      <StatleadersSection
        leader={statLeaders.perGame.blocksPerGame}
        stat="BPG"
      />

      <StatleadersSection
        leader={statLeaders.total.threePtPercentage}
        stat="3p%"
      />
      <StatleadersSection
        leader={statLeaders.perGame.threesPerGame}
        stat="3PPG"
      />
      <StatleadersSection
        leader={statLeaders.total.threePointersMade}
        stat="3PM"
      />

      <StatleadersSection leader={statLeaders.total.fgPercentage} stat="FGP" />
      <StatleadersSection leader={statLeaders.total.ftPercentage} stat="FTP" />
    </main>
  );
}

export default page;