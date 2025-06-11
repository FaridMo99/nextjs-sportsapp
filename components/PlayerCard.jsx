import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User2 } from "lucide-react";
import transformTeamName from "@/lib/transformTeamName";

function PlayerCard({ player }) {
  const birthDateFormatted = new Date(player.BirthDate).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const feet = Math.floor(player.Height / 12);
  const inches = player.Height % 12;
  const teamName = transformTeamName(player.Team);

  return (
    <Card
      style={{
        backgroundColor: `var(--${teamName[1]}-main)`,
        color: `var(--${teamName[1]}-second)`,
        borderColor: `var(--${teamName[1]}-second)`,
        boxShadow: `0 1px 4px var(--${teamName[1]}-second, rgba(0,0,0,0.1))`,
      }}
      className="w-full"
    >
      <CardHeader className="flex items-center gap-4">
        <User2 className="w-16 h-16" />
        <div className="flex-1">
          <CardTitle className="flex items-center justify-between">
            {player.FirstName} {player.LastName}
            <span className="text-sm">#{player.Jersey}</span>
          </CardTitle>
          <CardDescription style={{ color: `var(--${teamName[1]}-second)` }}>
            {teamName[0] + " " + teamName[1]}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Position</p>
            <p>{player.Position}</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p>{player.Status}</p>
          </div>
          <div>
            <p className="font-medium">Height</p>
            <p>
              {feet}&apos; {inches}&quot;
            </p>
          </div>
          <div>
            <p className="font-medium">Weight</p>
            <p>{player.Weight} lbs</p>
          </div>
          <div>
            <p className="font-medium">Birth Date</p>
            <p>{birthDateFormatted}</p>
          </div>
          <div>
            <p className="font-medium">Birth Place</p>
            <p>
              {player.BirthCity}, {player.BirthState}, {player.BirthCountry}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
