import React, { Suspense } from "react";
import "server-only";
import transformTeamName from "@/lib/transformTeamName";
import FirstCard from "./FirstCard";
import SecondCard from "./SecondCard";
import ThirdCard from "./ThirdCard";
import getCurrentSeason from "@/lib/getCurrentSeason";
import LoadingSpinner from "@/components/LoadingSpinner";
import getData, { getCachedData } from "@/lib/getData";
import { PlayerInfo, PlayerSeasonStat } from "@/app/types";

function getPlayer(
  players: PlayerInfo[] | PlayerSeasonStat[],
  id: string,
): PlayerInfo | PlayerSeasonStat {
  return players.find((player) => player.PlayerID === Number(id))!;
}

export async function generateStaticParams() {
  const players = await getCachedData<PlayerInfo[]>(
    `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
  );

  return players.map((player) => ({
    playerId: player.PlayerID.toString(),
  }));
}

export const revalidate = 43200;

export async function generateMetadata({
  params,
}: {
  params: { playerId: string };
}) {
  const { playerId } = params;

  const bios = await getCachedData<PlayerInfo[]>(
    `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
  );

  const bio = getPlayer(bios, playerId) as PlayerInfo;

  const playerName = `${bio.FirstName} ${bio.LastName}`;
  const teamName = bio.Team;

  return {
    title: playerName,
    description: `${playerName} of the ${teamName}`,
    authors: [{ name: "Farid Mohseni" }],
    openGraph: {
      title: `${playerName} | HoopTracker`,
      description: `${playerName} of the ${teamName}`,
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/players/${playerId}`,
      siteName: "HoopTracker",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${playerName} | HoopTracker`,
      description: `${playerName} of the ${teamName}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { playerId: string };
}) {
  const { playerId } = await params;

  const currentSeason: number = await getCurrentSeason();

  const [bios, allSeasonStats] = await Promise.all([
    getCachedData<PlayerInfo[]>(
      `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
    ),
    getData<PlayerSeasonStat[]>(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${currentSeason}?key=${process.env.API_KEY}`,
    ),
  ]);

  const bio = getPlayer(bios, playerId) as PlayerInfo;
  const seasonStats = getPlayer(allSeasonStats, playerId) as PlayerSeasonStat;

  const teamName = transformTeamName(bio.Team);

  return (
    <main className="flex-grow md:flex md:justify-evenly rounded-2xl p-4 m-3">
      <FirstCard bio={bio} teamName={teamName} />
      <SecondCard seasonStats={seasonStats} teamName={teamName} />
      <Suspense fallback={<LoadingSpinner />}>
        <ThirdCard
          playerId={playerId}
          currentSeason={currentSeason}
          seasons={bio.Experience}
          teamName={teamName}
        />
      </Suspense>
    </main>
  );
}

//the free api tier doesnt offer raw total career stats so i have to use this approach
//which is extremely inefficient
