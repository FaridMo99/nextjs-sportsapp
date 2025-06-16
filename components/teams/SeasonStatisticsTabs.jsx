"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import transformTeamName from "@/lib/transformTeamName";
import SectionWrapper from "../Home/SectionWrapper";
import Link from "next/link";

function SeasonStatisticsTabs({ statistics, gameLogs }) {
  const teamName = transformTeamName(statistics.Team);
  const opponentNames = gameLogs.map((log) => transformTeamName(log.Opponent));
  return (
    <SectionWrapper title={"Statistics:"} teamName={teamName}>
      <Tabs
        style={{
          backgroundColor: `var(--${teamName[1]}-main)`,
          color: `var(--${teamName[1]}-second)`,
          border: `2px solid var(--${teamName[1]}-second)`,
        }}
        defaultValue="season-stats"
        className="w-full  flex flex-col gap-6 p-4 rounded-xl"
      >
        <TabsList className="w-full flex justify-around bg-primary border-1 border-secondary-light">
          <TabsTrigger
            value="season-stats"
            className="font-bold text-white data-[state=active]:bg-secondary"
          >
            Season Stats
          </TabsTrigger>
          <TabsTrigger
            value="game-logs"
            className="font-bold text-white data-[state=active]:bg-secondary"
          >
            Game Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="season-stats">
          <Card
            style={{
              backgroundColor: `var(--${teamName[1]}-main)`,
              color: `var(--${teamName[1]}-second)`,
              border: `2px solid var(--${teamName[1]}-second)`,
            }}
          >
            <CardHeader>
              <CardTitle>
                {statistics.Name} - Season {statistics.Season}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <p>Points: {statistics.Points}</p>
              <p>Assists: {statistics.Assists}</p>
              <p>Rebounds: {statistics.Rebounds}</p>
              <p>Steals: {statistics.Steals}</p>
              <p>Blocks: {statistics.BlockedShots}</p>
              <p>Turnovers: {statistics.Turnovers}</p>
              <p>Wins: {statistics.Wins}</p>
              <p>Losses: {statistics.Losses}</p>
              <p>FG%: {statistics.FieldGoalsPercentage}%</p>
              <p>3P%: {statistics.ThreePointersPercentage}%</p>
              <p>FT%: {statistics.FreeThrowsPercentage}%</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="game-logs">
          <div className="flex flex-col gap-4">
            {gameLogs.map((log, index) => {
              const homeOrAway = log.HomeOrAway === "HOME" ? "Home" : "Away";
              const teamPoints = log.Points;
              const opponentPoints =
                log.Wins === 1
                  ? teamPoints + Math.abs(log.PlusMinus)
                  : teamPoints - Math.abs(log.PlusMinus);
              const didWin = log.Wins === 1;

              return (
                <Link key={index} href={`/schedule/${log.GameID}`}>
                  <Card
                    className="relative"
                    style={{
                      backgroundColor: `var(--${opponentNames[index][1]}-main)`,
                      color: `var(--${opponentNames[index][1]}-second)`,
                      border: `2px solid var(--${opponentNames[index][1]}-second)`,
                    }}
                  >
                    <CardHeader>
                      <CardTitle>
                        vs {log.Opponent} –{" "}
                        {new Date(log.DateTime).toLocaleDateString()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2 text-sm">
                      <p className="absolute top-1 right-3 font-bold text-lg">
                        {homeOrAway}
                      </p>
                      <p>Result: {didWin ? "Win" : "Loss"}</p>
                      <p>
                        Score: {teamPoints.toFixed(0)} -{" "}
                        {opponentPoints.toFixed(0)}
                      </p>
                      <p>Points: {log.Points}</p>
                      <p>Assists: {log.Assists}</p>
                      <p>Rebounds: {log.Rebounds}</p>
                      <p>Steals: {log.Steals}</p>
                      <p>Blocks: {log.BlockedShots}</p>
                      <p>Turnovers: {log.Turnovers}</p>
                      <p>FG%: {log.FieldGoalsPercentage}%</p>
                      <p>3P%: {log.ThreePointersPercentage}%</p>
                      <p>FT%: {log.FreeThrowsPercentage}%</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  );
}

export default SeasonStatisticsTabs;
