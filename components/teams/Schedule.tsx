import React from "react";
import LiveTag from "../LiveTag";
import SectionWrapper from "../Home/SectionWrapper";
import { getScheduleById } from "@/lib/getSchedule";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import "server-only";
import getData from "@/lib/getData";
import NoDataText from "../NoDataText";
import { SeasonProps } from "./Roster";
import { Game } from "@/app/types";

async function Schedule({ season, id, teamName }: Omit<SeasonProps, "abbr">) {
  const schedule = await getData<Game[]>(
    `https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}`,
  );
  const teamSchedule = getScheduleById(schedule, Number(id));

  if (schedule.length === 0) return <NoDataText text="No Players found..." />;

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
            const isFinal = game.Status === "Final" || game.Status === "F/OT";
            const isLive = game.Status === "InProgress";
            const isScheduled = game.Status === "Scheduled";
            const isCanceled = game.Status === "Canceled";
            const isPostponed = game.Status === "Postponed";

            return (
              <div
                key={game.GameID}
                className={`min-w-[180px] rounded-md p-4 flex flex-col gap-2 relative ${
                  isFinal || isPostponed || isCanceled
                    ? "bg-gray-300 text-gray-700"
                    : "bg-white text-black"
                }`}
              >
                <p className="text-xs font-semibold">
                  <Link href={`/schedule/${game.Season}/${game.GameID}`}>
                    {new Date(game.DateTime).toLocaleDateString()}
                  </Link>
                </p>

                {isLive && <LiveTag />}
                {isCanceled && (
                  <p className="absolute top-2 right-2 text-xs">Canceled</p>
                )}
                {isPostponed && (
                  <p className="absolute top-2 right-2 text-xs">Postponed</p>
                )}

                <p className="text-sm font-bold">
                  <Link href={`/schedule/${game.Season}/${game.GameID}`}>
                    {game.AwayTeam} @ {game.HomeTeam}
                  </Link>
                </p>

                {isFinal && (
                  <p className="text-sm">
                    {game.AwayTeam}: {game.AwayTeamScore} <br />
                    {game.HomeTeam}: {game.HomeTeamScore}
                  </p>
                )}

                {isScheduled && (
                  <p className="text-xs text-gray-500">
                    <Link href={`/schedule/${game.Season}/${game.GameID}`}>
                      Scheduled
                    </Link>
                  </p>
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
