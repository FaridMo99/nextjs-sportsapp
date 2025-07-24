import { BoxScorePlayerGame } from "@/app/types";
import PlayerCard from "@/components/PlayerCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import React from "react";

function PlayersStats({ players }: { players: BoxScorePlayerGame[] }) {
  return (
    <ScrollArea className="w-full mt-6 rounded-md whitespace-nowrap bg-secondary border-1 border-secondary-light">
      <div className="flex space-x-4 p-4">
        {players.map((player) => (
          <Link href={`/players/${player.PlayerID}`} key={player.PlayerID}>
            <div className="min-w-[270px]">
              <PlayerCard player={player} schedule />
            </div>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default PlayersStats;
