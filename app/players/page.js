import React from "react";
import PaginationComp from "@/components/PaginationComp";
import PlayerCard from "@/components/PlayerCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import "server-only";

function splitPlayersArray(players) {
  const newArr = [];
  const pageSize = 20;

  for (let i = 0; i < players.length; i += pageSize) {
    const slice = players.slice(i, i + pageSize);
    newArr.push(slice);
  }

  return newArr;
}

async function page({ searchParams }) {
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/PlayersActiveBasic?key=${process.env.API_KEY}`,
  );
  const players = await res.json();

  const params = await searchParams;

  const page = parseInt(params.page) || 1;

  const playersPagination = splitPlayersArray(players);

  if (page < 1 || page > playersPagination.length) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center flex-grow overflow-auto p-4 gap-6">
      {playersPagination[page - 1].map((player) => (
        <Link
          className="w-full"
          href={`/players/${player.PlayerID}`}
          key={player.BirthDate + player.FirstName + player.LastName}
        >
          <PlayerCard player={player} />
        </Link>
      ))}
      <PaginationComp page={page} length={playersPagination.length} />
    </main>
  );
}

export default page;

//here i have to mock pagination client side because the API
//doesnt offer these type of endpoints
