import { PlayerInfo, Team } from "@/app/types";
import { Icon, User2 } from "lucide-react";
import { basketball } from "@lucide/lab";
import React from "react";

type SearchItemCardProps = {
  type: "player" | "team";
  item: PlayerInfo | Team;
};

function SearchItemCard({ item, type }: SearchItemCardProps) {
  if (type === "player") {
    const player = item as PlayerInfo;
    return (
      <div className="relative w-full h-20 hover:bg-gray-500 flex items-center justify-evenly">
        <User2 className="absolute left-0 w-1/4" />
        <p className="absolute left-1/4 w-1/3 truncate whitespace-nowrap overflow-hidden">
          {player.FirstName + " " + player.LastName}
        </p>
        <p className="absolute top-1 right-1">#{player.Jersey}</p>
        <p className="absolute right-4">{player.Team}</p>
        <p className="absolute right-16">{player.Position}</p>
      </div>
    );
  }

  if (type === "team") {
    const team = item as Team;
    return (
      <div className="relative w-full h-20 hover:bg-gray-500 flex items-center justify-around">
        <Icon className="absolute left-0 w-1/4" iconNode={basketball} />
        <p className="absolute w-1/2 truncate whitespace-nowrap overflow-hidden">
          {team.City + " " + team.Name}
        </p>
        <p className="absolute right-4">{team.Conference}</p>
      </div>
    );
  }

  return null;
}

export default SearchItemCard;
