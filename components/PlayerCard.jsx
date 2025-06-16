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

function PlayerCard({ player, schedule = false }) {
  const teamName = transformTeamName(player.Team);

  const birthDateFormatted = !schedule
    ? new Date(player.BirthDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const feet = !schedule ? Math.floor(player.Height / 12) : null;
  const inches = !schedule ? player.Height % 12 : null;

  return (
    <Card
      as="section"
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
            {!schedule ? `${player.FirstName} ${player.LastName}` : player.Name}
            {!schedule && <span className="text-sm">#{player.Jersey}</span>}
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
            <p>{player.Position}</p>
          </div>

          {schedule ? (
            <>
              <div>
                <p className="font-medium">Minutes</p>
                <p>{player.Minutes}</p>
              </div>
              <div>
                <p className="font-medium">Points</p>
                <p>{player.Points}</p>
              </div>
              <div>
                <p className="font-medium">Rebounds</p>
                <p>{player.Rebounds}</p>
              </div>
              <div>
                <p className="font-medium">Assists</p>
                <p>{player.Assists}</p>
              </div>
              <div>
                <p className="font-medium">Steals</p>
                <p>{player.Steals}</p>
              </div>
              <div>
                <p className="font-medium">Blocks</p>
                <p>{player.BlockedShots}</p>
              </div>
              <div>
                <p className="font-medium">Turnovers</p>
                <p>{player.Turnovers}</p>
              </div>
              <div>
                <p className="font-medium">FGA / FGM</p>
                <p>
                  {player.FieldGoalsAttempted} / {player.FieldGoalsMade}
                </p>
              </div>
              <div>
                <p className="font-medium">3PA / 3PM</p>
                <p>
                  {player.ThreePointersAttempted} / {player.ThreePointersMade}
                </p>
              </div>
              <div>
                <p className="font-medium">FTA / FTM</p>
                <p>
                  {player.FreeThrowsAttempted} / {player.FreeThrowsMade}
                </p>
              </div>
              <div>
                <p className="font-medium">Fouls</p>
                <p>{player.PersonalFouls}</p>
              </div>
              <div>
                <p className="font-medium">PER</p>
                <p>{player.PlayerEfficiencyRating}</p>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
