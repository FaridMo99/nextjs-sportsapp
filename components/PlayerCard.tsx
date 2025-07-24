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
import { BoxScorePlayerGame, Player, TeamPlayer } from "@/app/types";

type PlayerCardProps = {
  player: TeamPlayer | Player | BoxScorePlayerGame;
  schedule?: boolean;
};

function PlayerCard({ player, schedule = false }: PlayerCardProps) {
  if (schedule) {
    const typePlayer = player as BoxScorePlayerGame;
    const teamName = transformTeamName(typePlayer.Team);

    return (
      <Card
        style={{
          backgroundColor: `var(--${teamName[1]}-main)`,
          color: `var(--${teamName[1]}-second)`,
          borderColor: `var(--${teamName[1]}-second)`,
          boxShadow: `0 1px 4px var(--${teamName[1]}-second, rgba(0,0,0,0.1))`,
        }}
        className="w-full h-full flex flex-col justify-between"
      >
        <CardHeader className="flex items-center gap-4">
          <User2 className="w-16 h-16" />
          <div className="flex-1">
            <CardTitle className="flex items-center justify-between">
              {typePlayer.Name}
            </CardTitle>
            <CardDescription style={{ color: `var(--${teamName[1]}-second)` }}>
              {teamName[0]} {teamName[1]}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Position</p>
              <p>{typePlayer.Position}</p>
            </div>
            <div>
              <p className="font-medium">Minutes</p>
              <p>{typePlayer.Minutes}</p>
            </div>
            <div>
              <p className="font-medium">Points</p>
              <p>{typePlayer.Points}</p>
            </div>
            <div>
              <p className="font-medium">Rebounds</p>
              <p>{typePlayer.Rebounds}</p>
            </div>
            <div>
              <p className="font-medium">Assists</p>
              <p>{typePlayer.Assists}</p>
            </div>
            <div>
              <p className="font-medium">Steals</p>
              <p>{typePlayer.Steals}</p>
            </div>
            <div>
              <p className="font-medium">Blocks</p>
              <p>{typePlayer.BlockedShots}</p>
            </div>
            <div>
              <p className="font-medium">Turnovers</p>
              <p>{typePlayer.Turnovers}</p>
            </div>
            <div>
              <p className="font-medium">FGA / FGM</p>
              <p>
                {typePlayer.FieldGoalsAttempted} / {typePlayer.FieldGoalsMade}
              </p>
            </div>
            <div>
              <p className="font-medium">3PA / 3PM</p>
              <p>
                {typePlayer.ThreePointersAttempted} /{" "}
                {typePlayer.ThreePointersMade}
              </p>
            </div>
            <div>
              <p className="font-medium">FTA / FTM</p>
              <p>
                {typePlayer.FreeThrowsAttempted} / {typePlayer.FreeThrowsMade}
              </p>
            </div>
            <div>
              <p className="font-medium">Fouls</p>
              <p>{typePlayer.PersonalFouls}</p>
            </div>
            <div>
              <p className="font-medium">PER</p>
              <p>{typePlayer.PlayerEfficiencyRating}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    const teamName = transformTeamName(player.Team);
    const typePlayerFalse = player as TeamPlayer | Player;

    const birthDateFormatted = new Date(
      typePlayerFalse.BirthDate,
    ).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const feet = Math.floor(typePlayerFalse.Height / 12);
    const inches = typePlayerFalse.Height % 12;

    return (
      <Card
        style={{
          backgroundColor: `var(--${teamName[1]}-main)`,
          color: `var(--${teamName[1]}-second)`,
          borderColor: `var(--${teamName[1]}-second)`,
          boxShadow: `0 1px 4px var(--${teamName[1]}-second, rgba(0,0,0,0.1))`,
        }}
        className="w-full h-full flex flex-col justify-between"
      >
        <CardHeader className="flex items-center gap-4">
          <User2 className="w-16 h-16" />
          <div className="flex-1">
            <CardTitle className="flex items-center justify-between">
              {`${typePlayerFalse.FirstName} ${typePlayerFalse.LastName}`}
              <span className="text-sm">#{typePlayerFalse.Jersey}</span>
            </CardTitle>
            <CardDescription style={{ color: `var(--${teamName[1]}-second)` }}>
              {teamName[0]} {teamName[1]}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Position</p>
              <p>{typePlayerFalse.Position}</p>
            </div>
            <div>
              <p className="font-medium">Height</p>
              <p>
                {feet}&apos; {inches}&quot;
              </p>
            </div>
            <div>
              <p className="font-medium">Weight</p>
              <p>{typePlayerFalse.Weight} lbs</p>
            </div>
            <div>
              <p className="font-medium">Birth Date</p>
              <p>{birthDateFormatted}</p>
            </div>
            <div>
              <p className="font-medium">Birth Place</p>
              <p>
                {typePlayerFalse.BirthCity}, {typePlayerFalse.BirthState},{" "}
                {typePlayerFalse.BirthCountry}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default PlayerCard;
