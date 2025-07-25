import React from "react";
import { getCurrentSeasonCached } from "@/lib/getCurrentSeason";
import StatleadersSection from "./StatleadersSection";
//import SelectYear from "@/components/teams/SelectYear";
import getStatLeaders from "@/lib/getStatLeaders";
import { notFound } from "next/navigation";
import getData from "@/lib/getData";
import NoDataText from "@/components/NoDataText";
import { PlayerSeasonStat } from "@/app/types";
import SeasonDisclaimer from "@/components/SeasonDisclaimer";

export async function generateStaticParams() {
  const {season} = await getCurrentSeasonCached();
  const limit = season - 1;

  return [{ season: String(season) }, { season: String(limit) }];
}

export const revalidate = 43200;

export async function generateMetadata({ params }: { params: { season: string } }) {
  const { season } =  params;
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

async function page({ params }: { params: { season: string } }) {
  const { season } = params;
  const seasonAsNumber = Number(season);
  const { season: currentSeason, message } = await getCurrentSeasonCached();
  const limit = currentSeason - 1;

  if (
    seasonAsNumber > currentSeason ||
    seasonAsNumber < limit ||
    isNaN(seasonAsNumber)
  )
    return notFound();

  const allPlayersSeasonStats = await getData<PlayerSeasonStat[]>(
    `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season}?key=${process.env.API_KEY}`
  );

  if (!allPlayersSeasonStats || allPlayersSeasonStats.length === 0) {
    return <NoDataText text="No Leaders available yet..." />;
  }

  const statLeaders = getStatLeaders(allPlayersSeasonStats);

  return (
    <main className="p-4 flex-grow overflow-auto">
      {/*<SelectYear
        currentSeason={currentSeason}
        chosenSeason={season}
        path="leaders"
      />*/}

      {[
        { stat: "Points", leader: statLeaders.total.points },
        { stat: "PPG", leader: statLeaders.perGame.pointsPerGame },
        { stat: "Assists", leader: statLeaders.total.assists },
        { stat: "APG", leader: statLeaders.perGame.assistsPerGame },
        { stat: "Rebounds", leader: statLeaders.total.rebounds },
        { stat: "RPG", leader: statLeaders.perGame.reboundsPerGame },
        { stat: "Steals", leader: statLeaders.total.steals },
        { stat: "SPG", leader: statLeaders.perGame.stealsPerGame },
        { stat: "Blocks", leader: statLeaders.total.blocks },
        { stat: "BPG", leader: statLeaders.perGame.blocksPerGame },
        { stat: "3p%", leader: statLeaders.total.threePtPercentage },
        { stat: "3PPG", leader: statLeaders.perGame.threesPerGame },
        { stat: "3PM", leader: statLeaders.total.threePointersMade },
        { stat: "FGP", leader: statLeaders.total.fgPercentage },
        { stat: "FTP", leader: statLeaders.total.ftPercentage },
      ].map(({ stat, leader }) => (
        <StatleadersSection key={stat} stat={stat} leader={leader} />
      ))}
      <SeasonDisclaimer seasonType={message} season={currentSeason} />
    </main>
  );
}

export default page;
