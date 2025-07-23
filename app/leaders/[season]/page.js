import React from "react";
import { getCurrentSeasonCached } from "@/lib/getCurrentSeason";
import StatleadersSection from "../StatleadersSection";
import SelectYear from "@/components/teams/SelectYear";
import getStatLeaders from "@/lib/getStatLeaders";
import { notFound } from "next/navigation";
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
    title: `${season} Leaders`,
    description: `Information about all ${season} Season Stat Leaders`,
    authors: [{ name: "Farid Mohseni" }],
    openGraph: {
      title: "Leaders | HoopTracker",
      description: `Information about all ${season} Season Stat Leaders`,
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/leaders`,
      siteName: "HoopTracker",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Leaders | HoopTracker",
      description: `Information about all ${season} Season Stat Leaders`,
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

  const allPlayersSeasonStats = await getData(
    `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season}?key=${process.env.API_KEY}`,
  );
  const statLeaders = getStatLeaders(allPlayersSeasonStats);

  if (!statLeaders || !allPlayersSeasonStats.length) {
    return <NoDataText text="No Leaders available yet..." />;
  }
  return (
    <main className="p-4 flex-grow overflow-auto">
      <SelectYear
        currentSeason={currentSeason}
        chosenSeason={season}
        path="leaders"
      />
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
