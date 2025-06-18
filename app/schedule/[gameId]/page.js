import React from "react";
import "server-only";
import GameCard from "./GameCard";
import QuarterTabs from "./QuarterTabs";
import TeamStatsSlider from "./TeamStatsSlider";
import PlayersStats from "./PlayersStats";
import StartingLineup from "./StartingLineup";
import { getCachedData } from "@/lib/getData";

export async function generateMetadata({ params }) {
  const { gameId } = params;

  const game = await getCachedData(
    `https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${gameId}?key=${process.env.API_KEY}`,
  );

  const { Game } = game;

  return {
    title: `Game: ${Game.HomeTeam} vs ${Game.AwayTeam}`,
    description: `Box score and stats for the game between ${Game.HomeTeam} and ${Game.AwayTeam} played on ${new Date(Game.DateTime).toLocaleDateString()}.`,
    authors: [{ name: "Farid Mohseni" }],
    openGraph: {
      title: `Game: ${Game.HomeTeam} vs ${Game.AwayTeam} | HoopTracker`,
      description: `Box score and stats for the game between ${Game.HomeTeam} and ${Game.AwayTeam} played on ${new Date(Game.DateTime).toLocaleDateString()}.`,
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/games/${gameId}`,
      siteName: "HoopTracker",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Game: ${Game.HomeTeam} vs ${Game.AwayTeam} | HoopTracker`,
      description: `Box score and stats for the game between ${Game.HomeTeam} and ${Game.AwayTeam} played on ${new Date(Game.DateTime).toLocaleDateString()}.`,
    },
  };
}

async function page({ params }) {
  const { gameId } = await params;

  const game = await getCachedData(
    `https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${gameId}?key=${process.env.API_KEY}`,
  );
  const { Game, PlayerGames, Quarters, TeamGames } = game;

  if (Game.Status === "Postponed" || Game.Status === "Canceled")
    return (
      <main className="p-4 flex-grow overflow-auto">
        <GameCard game={Game} />
      </main>
    );

  if (Game.Status === "Scheduled")
    return (
      <main className="p-4 flex-grow overflow-auto">
        <GameCard game={Game} />
        <StartingLineup players={PlayerGames} />
      </main>
    );

  return (
    <main className="p-4 flex-grow overflow-auto">
      <GameCard game={Game} />
      <QuarterTabs
        quarters={Quarters}
        hometeam={Game.HomeTeam}
        awayteam={Game.AwayTeam}
        hometeamId={Game.HomeTeamID}
        awayteamId={Game.AwayTeamID}
      />
      <TeamStatsSlider teamGames={TeamGames} />
      <PlayersStats players={PlayerGames} />
    </main>
  );
}

export default page;
