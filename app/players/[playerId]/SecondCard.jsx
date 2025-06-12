import React from "react";
import { BarChart2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function SecondCard({ seasonStats, teamName }) {
  const games = seasonStats.Games;

  const ppg = (seasonStats.Points / games).toFixed(1);
  const apg = (seasonStats.Assists / games).toFixed(1);
  const rpg = (seasonStats.Rebounds / games).toFixed(1);
  const spg = (seasonStats.Steals / games).toFixed(1);
  const bpg = (seasonStats.BlockedShots / games).toFixed(1);
  const tpg = (seasonStats.Turnovers / games).toFixed(1);
  const mpg = (seasonStats.Minutes / games).toFixed(1);

  return (
    <Card
      className="w-full md:w-1/3 md:h-full relative md:m-0 my-4"
      style={{
        backgroundColor: `var(--${teamName[1]}-main)`,
        color: `var(--${teamName[1]}-second)`,
        border: `2px solid var(--${teamName[1]}-second)`,
      }}
    >
      <CardHeader className="flex justify-between items-center">
        <BarChart2 size={60} aria-hidden="true" />
        <CardTitle className="text-xl font-semibold">
          {seasonStats.Name} – {seasonStats.Season} Season
        </CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        <CardDescription className="mb-2 font-semibold">
          Season Stats:
        </CardDescription>
        <p>Games Played: {games}</p>
        <p>Points Per Game (PPG): {ppg}</p>
        <p>Assists Per Game (APG): {apg}</p>
        <p>Rebounds Per Game (RPG): {rpg}</p>
        <p>Steals Per Game (SPG): {spg}</p>
        <p>Blocks Per Game (BPG): {bpg}</p>
        <p>Turnovers Per Game (TOPG): {tpg}</p>
        <p>Minutes Per Game (MPG): {mpg}</p>
        <p>Field Goal %: {seasonStats.FieldGoalsPercentage}%</p>
        <p>3PT %: {seasonStats.ThreePointersPercentage}%</p>
        <p>FT %: {seasonStats.FreeThrowsPercentage}%</p>
        <p>Effective FG %: {seasonStats.EffectiveFieldGoalsPercentage}%</p>
        <p>True Shooting %: {seasonStats.TrueShootingPercentage}%</p>
        <p>Usage Rate: {seasonStats.UsageRatePercentage}%</p>
        <p>PER (Efficiency): {seasonStats.PlayerEfficiencyRating}</p>
      </CardContent>
    </Card>
  );
}

export default SecondCard;
