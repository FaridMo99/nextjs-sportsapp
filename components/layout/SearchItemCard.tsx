import { PlayerInfo, Team } from "@/app/types";
import { Icon, User2 } from "lucide-react";
import { basketball } from "@lucide/lab";
import React from "react";
import Link from "next/link";

type SearchItemCardProps = {
  type: "player" | "team";
  item: PlayerInfo | Team;
  season: number;
};

function SearchItemCard({ item, type, season }: SearchItemCardProps) {
  if (type === "player") {
    const player = item as PlayerInfo;
    return (
      <Link
        href={`/players/${player.PlayerID}`}
        className="relative w-full h-20 hover:bg-gray-500 flex items-center justify-evenly focus:bg-red-500"
      >
        <User2 className="absolute left-0 w-1/4" />
        <p className="absolute left-1/4 w-1/3 truncate whitespace-nowrap overflow-hidden">
          {player.FirstName + " " + player.LastName}
        </p>
        <p className="absolute top-1 right-1">#{player.Jersey}</p>
        <p className="absolute right-4">{player.Team}</p>
        <p className="absolute right-16">{player.Position}</p>
      </Link>
    );
  }

  if (type === "team") {
    const team = item as Team;
    return (
      <Link
        href={`/teams/${team.TeamID}/${season}`}
        className="relative w-full h-20 hover:bg-gray-500 flex items-center justify-around focus:bg-red-500"
      >
        <Icon className="absolute left-0 w-1/4" iconNode={basketball} />
        <p className="absolute left-1/4 w-5/12 truncate whitespace-nowrap overflow-hidden">
          {team.City + " " + team.Name}
        </p>
        <p className="absolute w-1/5 truncate whitespace-nowrap overflow-hidden right-4">
          {team.Conference}
        </p>
      </Link>
    );
  }

  return null;
}

export default SearchItemCard;
