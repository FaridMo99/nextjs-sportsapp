import React from "react";
import "server-only";
import GameCard from "./GameCard";
import QuarterTabs from "./QuarterTabs";
import TeamStatsSlider from "./TeamStatsSlider";
import PlayersStats from "./PlayersStats";
import StartingLineup from "./StartingLineup";

async function page({ params }) {
  const { gameId } = await params;
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${gameId}?key=${process.env.API_KEY}`,
  );
  const game = await res.json();
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
