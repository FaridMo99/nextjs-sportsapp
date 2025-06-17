import React, { Suspense } from "react";
import "server-only";
import transformTeamName from "@/lib/transformTeamName";
import FirstCard from "./FirstCard";
import SecondCard from "./SecondCard";
import ThirdCard from "./ThirdCard";
import getCurrentSeason from "@/lib/getCurrentSeason";
import LoadingSpinner from "@/components/LoadingSpinner";

function getPlayer(players, id) {
  return players.find((player) => player.PlayerID === Number(id));
}

export default async function Page({ params }) {
  const { playerId } = await params;

  const currentSeason = await getCurrentSeason();

  const [biosRes, allSeasonStatsRes] = await Promise.all([
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
    ),
    fetch(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${currentSeason}?key=${process.env.API_KEY}`,
    ),
  ]);

  const [bios, allSeasonStats] = await Promise.all([
    biosRes.json(),
    allSeasonStatsRes.json(),
  ]);

  const bio = getPlayer(bios, playerId);
  const seasonStats = getPlayer(allSeasonStats, playerId);

  const teamName = transformTeamName(bio.Team);

  return (
    <main className="flex-grow md:flex md:justify-evenly rounded-2xl p-4 m-3">
      <FirstCard bio={bio} teamName={teamName} />
      <SecondCard seasonStats={seasonStats} teamName={teamName} />
      <Suspense fallback={<LoadingSpinner />}>
        <ThirdCard
          playerId={playerId}
          currentSeason={parseInt(currentSeason)}
          seasons={parseInt(bio.Experience)}
          teamName={teamName}
        />
      </Suspense>
    </main>
  );
}

//the free api tier doesnt offer raw total career stats so i have to use this approach
//which is extremely inefficient
