import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Crown } from "lucide-react";
import transformTeamName from "@/lib/transformTeamName";
import Link from "next/link";
import { ExtendedPlayerSeasonStat } from "@/app/types";

type Stat = { statKey: string; mappings: keyof ExtendedPlayerSeasonStat };

const stats: Stat[] = [
  { statKey: "Points", mappings: "Points" },
  { statKey: "Points Per Game", mappings: "pointsPerGame" },
  { statKey: "Assists", mappings: "Assists" },
  { statKey: "Assists Per Game", mappings: "assistsPerGame" },
  { statKey: "Rebounds", mappings: "Rebounds" },
  { statKey: "Rebounds Per Game", mappings: "reboundsPerGame" },
  { statKey: "Blocks", mappings: "BlockedShots" },
  { statKey: "Blocks Per Game", mappings: "blocksPerGame" },
  { statKey: "Steals", mappings: "Steals" },
  { statKey: "Steals Per Game", mappings: "stealsPerGame" },
  { statKey: "Field Goals Made", mappings: "FieldGoalsMade" },
  { statKey: "Field Goals Attempted", mappings: "FieldGoalsAttempted" },
  { statKey: "Field Goals %", mappings: "FieldGoalsPercentage" },
  { statKey: "Free Throws Made", mappings: "FreeThrowsMade" },
  { statKey: "Free Throws Attempted", mappings: "FreeThrowsAttempted" },
  { statKey: "Free Throws %", mappings: "FreeThrowsPercentage" },
  { statKey: "Three Pointers Made", mappings: "ThreePointersMade" },
  { statKey: "Three Pointers Attempted", mappings: "ThreePointersAttempted" },
  { statKey: "Three Pointers %", mappings: "ThreePointersPercentage" },
  { statKey: "Three Pointers Per Game", mappings: "threesPerGame" },
];

function StatleadersSection({
  leader,
  stat,
}: {
  leader: ExtendedPlayerSeasonStat;
  stat: string;
}) {
  const teamName = transformTeamName(leader.Team);

  return (
    <section className="my-4">
      <Link href={`/players/${leader.PlayerID}`}>
        <Card
          style={{
            backgroundColor: `var(--${teamName[1]}-main)`,
            color: `var(--${teamName[1]}-second)`,
            border: `2px solid var(--${teamName[1]}-second)`,
          }}
          className="font-bold text-white rounded-lg shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <User size={48} />
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {leader.Name}
                </h2>
                <p className="text-lg opacity-90">
                  {leader.Team} – {leader.Position}
                </p>
                <p className="text-lg flex items-center mt-1">
                  {stat}
                  <Crown size={24} className="text-yellow-400 ml-1" />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {stats.map(({ statKey, mappings }) => {
                const value = leader[mappings];
                return (
                  <div key={String(mappings)} className="flex justify-between">
                    <span>{statKey}:</span>
                    <span>
                      {typeof value === "number" ? value.toFixed(2) : value}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </Link>
    </section>
  );
}

export default StatleadersSection;
