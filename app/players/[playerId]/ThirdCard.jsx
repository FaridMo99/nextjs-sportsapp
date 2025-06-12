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

function ThirdCard({ careerStats, teamName }) {
  const { total, averaged } = careerStats;

  return (
    <Card
      as="section"
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
