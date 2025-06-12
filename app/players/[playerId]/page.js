import React from "react";
import "server-only";
import transformTeamName from "@/lib/transformTeamName";
import FirstCard from "./FirstCard";
import SecondCard from "./SecondCard";
import ThirdCard from "./ThirdCard";

function getPlayer(players, id) {
  console.log(players);
  return players.find((player) => player.PlayerID === Number(id));
}

async function calculateCareerStats(playerId, currentSeason, seasons) {
  const stats = [];

  for (let i = 0; i < seasons; i++) {
    const season = currentSeason - i;

    const res = await fetch(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/${season}/${playerId}?key=${process.env.API_KEY}`,
    );

    if (!res.ok) continue;

    const data = await res.json();
    if (data && data.Games !== 0) {
      stats.push(data);
    }
  }

  if (stats.length === 0) return null;

  const total = stats.reduce((acc, season) => {
    for (const key in season) {
      if (typeof season[key] === "number") {
        acc[key] = (acc[key] || 0) + season[key];
      }
    }
    return acc;
  }, {});

  const totalGames = total.Games;

  const averaged = {
    PointsPerGame: (total.Points / totalGames).toFixed(1),
    AssistsPerGame: (total.Assists / totalGames).toFixed(1),
    ReboundsPerGame: (total.Rebounds / totalGames).toFixed(1),
    StealsPerGame: (total.Steals / totalGames).toFixed(1),
    BlocksPerGame: (total.BlockedShots / totalGames).toFixed(1),
    FieldGoalsPercentage: (total.FieldGoalsPercentage / stats.length).toFixed(
      1,
    ),
    ThreePointersPercentage: (
      total.ThreePointersPercentage / stats.length
    ).toFixed(1),
    FreeThrowsPercentage: (total.FreeThrowsPercentage / stats.length).toFixed(
      1,
    ),
    Games: totalGames,
    Seasons: stats.length,
  };

  return { total, averaged };
}

export default async function Page({ params }) {
  const { playerId } = await params;

  const currentSeasonRes = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${process.env.API_KEY}`,
  );
  const currentSeasonData = await currentSeasonRes.json();
  const currentSeason = currentSeasonData.Season;

  const biosRes = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
  );
  const bios = await biosRes.json();

  const allSeasonStatsRes = await fetch(
    `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${currentSeason}?key=${process.env.API_KEY}`,
  );
  const allSeasonStats = await allSeasonStatsRes.json();

  const bio = getPlayer(bios, playerId);
  const seasonStats = getPlayer(allSeasonStats, playerId);
  const careerStats = await calculateCareerStats(
    playerId,
    parseInt(currentSeason),
    parseInt(bio.Experience),
  );

  const teamName = transformTeamName(bio.Team);

  return (
    <main className="flex-grow md:flex md:justify-evenly overflow-auto rounded-2xl p-4 m-3">
      <FirstCard bio={bio} teamName={teamName} />
      <SecondCard seasonStats={seasonStats} teamName={teamName} />
      <ThirdCard careerStats={careerStats} teamName={teamName} />
    </main>
  );
}

//the free api tier doesnt offer raw total career stats so i have to use this approach
//which is extremely inefficient
