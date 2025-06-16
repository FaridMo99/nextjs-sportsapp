"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import transformTeamName from "@/lib/transformTeamName";
import Link from "next/link";
function TeamStatsSlider({ teamGames }) {
  const containerRef = useRef(null);
  const [sliderX, setSliderX] = useState(50);

  useEffect(() => {
    setSliderX(50);
  }, []);

  if (!teamGames || teamGames.length !== 2) return null;

  const [teamA, teamB] = teamGames;
  const teamNameA = transformTeamName(teamA.Team);
  const teamNameB = transformTeamName(teamB.Team);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[33vh] mx-auto overflow-hidden rounded-xl border-1 border-secondary-light bg-secondary mt-6"
    >
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <Card
            style={{
              backgroundColor: `var(--${teamNameB[1]}-main)`,
              color: `var(--${teamNameB[1]}-second)`,
              border: `2px solid var(--${teamNameB[1]}-second)`,
            }}
            className="w-full h-full"
          >
            <CardContent className="pt-4 space-y-1 flex flex-col items-end">
              <h2 className="text-xl font-semibold">
                <Link href={`teams/${teamB.TeamID}`}>{teamB.Name}</Link>
              </h2>
              <p>Points: {teamB.Points}</p>
              <p>Rebounds: {teamB.Rebounds}</p>
              <p>Assists: {teamB.Assists}</p>
              <p>Steals: {teamB.Steals}</p>
              <p>Turnovers: {teamB.Turnovers}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 h-full z-10 overflow-hidden"
        style={{ width: `${sliderX}%` }}
      >
        <div className="w-full h-full">
          <Card
            style={{
              backgroundColor: `var(--${teamNameA[1]}-main)`,
              color: `var(--${teamNameA[1]}-second)`,
              border: `2px solid var(--${teamNameA[1]}-second)`,
            }}
            className="w-full h-full"
          >
            <CardContent className="pt-4 space-y-1">
              <h2 className="text-xl font-semibold min-w-40">
                <Link href={`teams/${teamA.TeamID}`}>{teamA.Name}</Link>
              </h2>
              <p className="w-30">Points: {teamA.Points}</p>
              <p className="w-30">Rebounds: {teamA.Rebounds}</p>
              <p className="w-30">Assists: {teamA.Assists}</p>
              <p className="w-30">Steals: {teamA.Steals}</p>
              <p className="w-30">Turnovers: {teamA.Turnovers}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <motion.div
        className="absolute top-0 h-full w-1 bg-gray-800 z-20 cursor-col-resize"
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        onDrag={(e, info) => {
          if (!containerRef.current) return;
          const bounds = containerRef.current.getBoundingClientRect();
          const newPercent =
            ((info.point.x - bounds.left) / bounds.width) * 100;
          setSliderX(Math.min(100, Math.max(0, newPercent)));
        }}
        style={{ left: `${sliderX}%`, x: "-0.5px" }}
      />
    </div>
  );
}

export default TeamStatsSlider;

/*const TeamGames = [
{
Assists:4
AssistsPercentage:null
BlockedShots:8.9
BlocksPercentage:null
DateTime:"2024-10-22T19:30:00"
Day:"2024-10-22T00:00:00"
DefensiveRebounds:49.8
DefensiveReboundsPercentage:null
DoubleDoubles:0
EffectiveFieldGoalsPercentage:105.7
FantasyPoints:307.2
FantasyPointsDraftKings:329
FantasyPointsFanDuel:315.8
FantasyPointsFantasyDraft:329
FantasyPointsYahoo:315.8
FieldGoalsAttempted:134
FieldGoalsMade:73.9
FieldGoalsPercentage:94.7
FreeThrowsAttempted:5
FreeThrowsMade:20.6
FreeThrowsPercentage:128.8
GameID:21022
Games:1
GlobalGameID:20021022
GlobalOpponentID:20000009
GlobalTeamID:20000006
HomeOrAway:"AWAY"
IsClosed:false
IsGameOver:true
LineupConfirmed:null
LineupStatus:"Scrambled"
Losses:1
Minutes:412
Name:"New York Knicks"
OffensiveRebounds:14.8
OffensiveReboundsPercentage:null
Opponent:"BOS"
OpponentID:9
PersonalFouls:20.6
PlayerEfficiencyRating:null
PlusMinus:-197.6
Points:187.3
Possessions:152.3
Rebounds:58.4
Season:2025
SeasonType:1
Seconds:0
StatID:1278268
Steals:5.9
StealsPercentage:null
Team:"NY"
TeamID:6
ThreePointersAttempted:51.5
ThreePointersMade:18.9
ThreePointersPercentage:63.1
TotalReboundsPercentage:null
TripleDoubles:0
TrueShootingAttempts:146.1
TrueShootingPercentage:110.1
TurnOversPercentage:null
Turnovers:18.9
TwoPointersAttempted:82.5
TwoPointersMade:55
TwoPointersPercentage:114.6
Updated:"2024-10-25T03:59:26"
UsageRatePercentage:null
Wins:0
}] */
