import React from "react";
import LiveTag from "../LiveTag";
import { getScheduleById } from "@/lib/getSchedule";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import "server-only";

//every game should be a link to /schedule/[id]
async function Schedule({ season, id }) {
  //const res = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}`)
  //const schedule = await res.json()
  //teamSchedule = getScheduleById(schedule, id)

  return (
    <section className="w- mt-4">
      <h2 className="font-bold text-2xl mb-2">Schedule:</h2>
      <ScrollArea className="w-full rounded-md border whitespace-nowrap">
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
    </section>
  );
}

export default Schedule;

const teamSchedule = [
  {
    AlternateID: null,
    Attendance: 19842,
    AwayRotationNumber: 199,
    AwayTeam: "LAL",
    AwayTeamID: 27,
    AwayTeamMoneyLine: 64,
    AwayTeamScore: 42,
    Channel: "TNT",
    CrewChiefID: 20000054,
    DateTime: "2023-10-24T19:30:00",
    DateTimeUTC: "2023-10-24T23:30:00",
    Day: "2023-10-24T00:00:00",
    GameEndDateTime: "2023-10-24T21:54:39",
    GameID: 19593,
    GlobalAwayTeamID: 20000027,
    GlobalGameID: 20019593,
    GlobalHomeTeamID: 20000020,
    HomeRotationNumber: 199,
    HomeTeam: "DEN",
    HomeTeamID: 20,
    HomeTeamMoneyLine: -78,
    HomeTeamScore: 47,
    InseasonTournament: false,
    IsClosed: true,
    LastPlay: "Scrambled",
    NeutralVenue: false,
    OverPayout: -44,
    OverUnder: 91.1,
    PointSpread: -1.8,
    PointSpreadAwayTeamMoneyLine: -43,
    PointSpreadHomeTeamMoneyLine: -45,
    Quarter: null,
    Quarters: [],
    RefereeID: 20000030,
    Season: 2024,
    SeasonType: 1,
    SeriesInfo: null,
    StadiumID: 20,
    Status: "InProgress",
    TimeRemainingMinutes: null,
    TimeRemainingSeconds: null,
    UmpireID: 20000048,
    UnderPayout: -43,
    Updated: "2024-01-30T04:01:14",
  },
];
