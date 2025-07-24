import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User2 } from "lucide-react";
import transformTeamName from "@/lib/transformTeamName";
import { BoxScorePlayerGame } from "@/app/types";

function StartingLineup({ players }: { players: BoxScorePlayerGame[] }) {
  if (!players || players.length === 0)
    return (
      <p className="w-full flex justify-center items-center font-bold text-xl text-white mt-6">
        Players not known yet...
      </p>
    );
  return (
    <ScrollArea className="w-full mt-6 rounded-md whitespace-nowrap bg-secondary border border-secondary-light">
      <div className="flex space-x-4 p-4">
        {players.map((player) => {
          const teamName = transformTeamName(player.Team);

          return (
            <Link href={`/players/${player.PlayerID}`} key={player.PlayerID}>
              <div className="min-w-[270px]">
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
                      <CardTitle className="text-base font-semibold">
                        {player.Name}
                      </CardTitle>
                      <CardDescription
                        style={{
                          color: `var(--${teamName[1]}-second)`,
                        }}
                      >
                        {teamName[0]} {teamName[1]}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="text-sm">
                      <p className="font-medium">Position</p>
                      <p>{player.Position}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default StartingLineup;
