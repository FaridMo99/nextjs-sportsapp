import React from "react";
import { Icon } from "lucide-react";
import { basketball } from "@lucide/lab";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import "server-only";
import { TeamName } from "@/lib/transformTeamName";

type ThirdCardProps = {
  playerId: string;
  currentSeason: number;
  seasons: number;
  teamName: TeamName;
};

type CareerStats = {
  total: Record<string, number>;
  averaged: {
    PointsPerGame: string;
    AssistsPerGame: string;
    ReboundsPerGame: string;
    StealsPerGame: string;
    BlocksPerGame: string;
    FieldGoalsPercentage: string;
    ThreePointersPercentage: string;
    FreeThrowsPercentage: string;
    Games: number;
    Seasons: number;
  };
};

async function calculateCareerStats(
  playerId: string,
  currentSeason: number,
  seasons: number,
): Promise<CareerStats> {
  const stats = [];

  for (let i = 0; i < seasons; i++) {
    const season = currentSeason - i;

    const res = await fetch(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/${season}/${playerId}?key=${process.env.API_KEY}`,
    );

    if (!res.ok) continue;

    const data = await res.json();
    if (data && data.Games !== 0) {
      stats.push(data);
    }
  }

  const total = stats.reduce((acc, season) => {
    for (const key in season) {
      if (typeof season[key] === "number") {
        acc[key] = (acc[key] || 0) + season[key];
      }
    }
    return acc;
  }, {});

  for (const key in total) {
    if (typeof total[key] === "number") {
      total[key] = Math.trunc(total[key]);
    }
  }

  const totalGames = total.Games;

  const averaged = {
    PointsPerGame: (total.Points / totalGames).toFixed(1),
    AssistsPerGame: (total.Assists / totalGames).toFixed(1),
    ReboundsPerGame: (total.Rebounds / totalGames).toFixed(1),
    StealsPerGame: (total.Steals / totalGames).toFixed(1),
    BlocksPerGame: (total.BlockedShots / totalGames).toFixed(1),
    FieldGoalsPercentage: (total.FieldGoalsPercentage / stats.length).toFixed(
      1,
    ),
    ThreePointersPercentage: (
      total.ThreePointersPercentage / stats.length
    ).toFixed(1),
    FreeThrowsPercentage: (total.FreeThrowsPercentage / stats.length).toFixed(
      1,
    ),
    Games: totalGames,
    Seasons: stats.length,
  };

  return { total, averaged };
}

async function ThirdCard({
  playerId,
  currentSeason,
  seasons,
  teamName,
}: ThirdCardProps) {
  const { total, averaged } = await calculateCareerStats(
    playerId,
    currentSeason,
    seasons,
  );

  return (
    <Card
      className="w-full md:w-1/3 md:h-full relative"
      style={{
        backgroundColor: `var(--${teamName[1]}-main)`,
        color: `var(--${teamName[1]}-second)`,
        border: `2px solid var(--${teamName[1]}-second)`,
      }}
    >
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">Career Stats</CardTitle>
        <Icon iconNode={basketball} size={60} aria-hidden="true" />
      </CardHeader>
      <CardContent className="font-bold">
        <CardDescription className="mb-2 font-semibold">
          Totals & Averages:
        </CardDescription>
        <p>Total Games: {total.Games}</p>
        <p>Total Points: {total.Points}</p>
        <p>Points Per Game: {averaged.PointsPerGame}</p>
        <p>Total Assists: {total.Assists}</p>
        <p>Assists Per Game: {averaged.AssistsPerGame}</p>
        <p>Total Rebounds: {total.Rebounds}</p>
        <p>Rebounds Per Game: {averaged.ReboundsPerGame}</p>
        <p>Total Steals: {total.Steals}</p>
        <p>Steals Per Game: {averaged.StealsPerGame}</p>
        <p>Total Blocks: {total.BlockedShots}</p>
        <p>Blocks Per Game: {averaged.BlocksPerGame}</p>
        <p>FG%: {averaged.FieldGoalsPercentage}%</p>
        <p>3P%: {averaged.ThreePointersPercentage}%</p>
        <p>FT%: {averaged.FreeThrowsPercentage}%</p>
      </CardContent>
    </Card>
  );
}

export default ThirdCard;
