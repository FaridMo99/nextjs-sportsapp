import React from "react";
import "server-only";
import GameCard from "./GameCard";
import QuarterTabs from "./QuarterTabs";
import TeamStatsSlider from "./TeamStatsSlider";
import PlayersStats from "./PlayersStats";
import StartingLineup from "./StartingLineup";

async function page({ id }) {
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${id}?key=${process.env.API_KEY}`,
  );
  const game = await res.json();
  const { Game, PlayerGames, Quarters, TeamGames } = game;

  return (
    <main className="p-4 flex-grow overflow-auto">
      <GameCard game={Game} />
      {Game.Status !== "Scheduled" ? (
        <>
          <QuarterTabs
            quarters={Quarters}
            hometeam={Game.HomeTeam}
            awayteam={Game.AwayTeam}
            hometeamId={Game.HomeTeamID}
            awayteamId={Game.AwayTeamID}
          />
          <TeamStatsSlider teamGames={TeamGames} />
          <PlayersStats players={PlayerGames} />
        </>
      ) : (
        <StartingLineup players={PlayerGames} />
      )}
    </main>
  );
}

export default page;
//if game "Scheduled" give starting lineups
