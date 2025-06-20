import React from "react";
import getCurrentSeason from "@/lib/getCurrentSeason";
import StatleadersSection from "./StatleadersSection";
import SelectYear from "@/components/teams/SelectYear";
import getStatLeaders from "@/lib/getStatLeaders";
import { notFound } from "next/navigation";
import getData from "@/lib/getData";

export const metadata = {
  title: "Leaders",
  description: "Information about all Season Stat Leaders",
  authors: [{ name: "Farid Mohseni" }],
  openGraph: {
    title: "Leaders | HoopTracker",
    description: "Information about all Season Stat Leaders",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/leaders`,
    siteName: "HoopTracker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaders | HoopTracker",
    description: "Information about all Season Stat Leaders",
  },
};

async function page({ searchParams }) {
  const search = await searchParams;
  const currentSeason = await getCurrentSeason();
  const season =
    search.season && Object.keys(search).length > 0
      ? search.season
      : currentSeason;

  const allPlayersSeasonStats = await getData(
    `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season}?key=${process.env.API_KEY}`,
  );
  const statLeaders = getStatLeaders(allPlayersSeasonStats);

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

  if (!statLeaders || !allPlayersSeasonStats.length) {
    return (
      <p className="w-full flex justify-center mt-4 text-white font-bold text-2xl">
        No Leaders available yet...
      </p>
    );
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
