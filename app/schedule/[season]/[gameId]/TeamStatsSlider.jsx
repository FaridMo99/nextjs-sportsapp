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
                <Link href={`/teams/${teamA.TeamID}`}>{teamA.Name}</Link>
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
