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
import SeasonDisclaimer from "@/components/SeasonDisclaimer";
import NoDataText from "@/components/NoDataText";

function getPlayer(
  players: PlayerInfo[] | PlayerSeasonStat[],
  id: string,
): PlayerInfo | PlayerSeasonStat | undefined {
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
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;

  const bios = await getCachedData<PlayerInfo[]>(
    `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`
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

export default async function Page({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;

  const { season: currentSeason, message } = await getCurrentSeason();

  const [bios, allSeasonStats] = await Promise.all([
    getCachedData<PlayerInfo[]>(
      `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`
    ),
    getData<PlayerSeasonStat[]>(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${currentSeason}?key=${process.env.API_KEY}`
    ),
  ]);

  const bio = getPlayer(bios, playerId) as PlayerInfo;
  const seasonStats = getPlayer(allSeasonStats, playerId) as PlayerSeasonStat;
  console.log(seasonStats)
  const teamName = transformTeamName(bio.Team);
  
  return (
    <div className="flex flex-grow flex-col items-center justify-evenly p-4">
      <main className="flex-grow w-full md:flex md:justify-evenly rounded-2xl mb-2">
        <FirstCard bio={bio} teamName={teamName} />
        {seasonStats !== undefined ? (
          <>
            <SecondCard seasonStats={seasonStats} teamName={teamName} />
            <Suspense fallback={<LoadingSpinner />}>
              <ThirdCard
                playerId={playerId}
                currentSeason={currentSeason}
                seasons={bio.Experience}
                teamName={teamName}
              />
            </Suspense>
          </>
        ) : (
          <NoDataText text="Player has no Statistics yet." />
        )}
      </main>
      <SeasonDisclaimer seasonType={message} season={currentSeason} />
    </div>
  );
}

//the free api tier doesnt offer raw total career stats so i have to use this approach
//which is extremely inefficient