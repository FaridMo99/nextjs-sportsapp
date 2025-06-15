import React from "react";
import LiveTag from "../LiveTag";
import SectionWrapper from "../Home/SectionWrapper";
import { getScheduleById } from "@/lib/getSchedule";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import "server-only";

async function Schedule({ season, id, teamName }) {
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}`,
  );
  const schedule = await res.json();
  const teamSchedule = getScheduleById(schedule, Number(id));

  return (
    <SectionWrapper title={"Schedule:"} teamName={teamName}>
      <ScrollArea
        style={{
          backgroundColor: `var(--${teamName[1]}-main)`,
          border: `2px solid var(--${teamName[1]}-second)`,
        }}
        className="w-full rounded-md border whitespace-nowrap"
      >
        <div className="flex space-x-4 p-4">
          {teamSchedule.map((game) => {
            const isFinal = game.Status === "Final";
            const isLive = game.Status === "InProgress";
            const isScheduled = game.Status === "Scheduled";

            return (
              <div
                key={game.GameID}
                className={`min-w-[180px] rounded-md p-4 flex flex-col gap-2 relative ${
                  isFinal ? "bg-gray-300 text-gray-700" : "bg-white text-black"
                }`}
              >
                <p className="text-xs font-semibold">
                  {new Date(game.DateTime).toLocaleDateString()}
                </p>

                {isLive && <LiveTag />}

                <p className="text-sm font-bold">
                  {game.AwayTeam} @ {game.HomeTeam}
                </p>

                {isFinal && (
                  <p className="text-sm">
                    {game.AwayTeam}: {game.AwayTeamScore} <br />
                    {game.HomeTeam}: {game.HomeTeamScore}
                  </p>
                )}

                {isScheduled && (
                  <p className="text-xs text-gray-500">Scheduled</p>
                )}
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </SectionWrapper>
  );
}

export default Schedule;
