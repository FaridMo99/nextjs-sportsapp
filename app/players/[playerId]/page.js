import React, { Suspense } from "react";
import "server-only";
import transformTeamName from "@/lib/transformTeamName";
import FirstCard from "./FirstCard";
import SecondCard from "./SecondCard";
import ThirdCard from "./ThirdCard";
import getCurrentSeason from "@/lib/getCurrentSeason";
import LoadingSpinner from "@/components/LoadingSpinner";
import getData, { getCachedData } from "@/lib/getData";

function getPlayer(players, id) {
  return players.find((player) => player.PlayerID === Number(id));
}

export async function generateStaticParams() {
  const players = await getCachedData(
    `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
  );

  return players.map((player) => ({
    playerId: player.PlayerID.toString(),
  }));
}

const revalidate = 43200;

export async function generateMetadata({ params }) {
  const { playerId } = params;

  const bios = await getCachedData(
    `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
  );

  const bio = getPlayer(bios, playerId);

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

export default async function Page({ params }) {
  const { playerId } = await params;

  const currentSeason = await getCurrentSeason();

  const [bios, allSeasonStats] = await Promise.all([
    getCachedData(
      `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
    ),
    getData(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${currentSeason}?key=${process.env.API_KEY}`,
    ),
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
