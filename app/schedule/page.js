import React from "react";
import { notFound } from "next/navigation";
import getCurrentSeason from "@/lib/getCurrentSeason";
import SelectYear from "@/components/teams/SelectYear";
import ScheduleAccordion from "../../components/schedule/ScheduleAccordion";
import "server-only";

async function page({ searchParams }) {
  const search = await searchParams;
  const currentSeason = "2024"; //remove later
  const season =
    search.season && Object.keys(search).length > 0
      ? search.season
      : currentSeason;
  //const res = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Games/${2023}?key=${process.env.API_KEY}`)
  //const schedule = await res.json()
  //const currentSeason = getCurrentSeason()

  for (const [key, value] of Object.entries(search)) {
    if (
      key !== "season" ||
      parseInt(value) > parseInt(currentSeason) + 1 ||
      parseInt(value) < 1950
    ) {
      return notFound();
    }
  }

  //if(schedule.length === 0) return <p className="w-full flex justify-center mt-4 text-white font-bold text-2xl">No Games found...</p>

  return (
    <main className="p-4 flex-grow overflow-auto">
      <SelectYear currentSeason={season} schedule />
      <ScheduleAccordion schedule={schedule} />
    </main>
  );
}

export default page;

//nested dynamic route by gameId, for every single game data
//not allowed to go to previous seasons so give disclaimer and block it

const schedule = [
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
    Status: "Final",
    TimeRemainingMinutes: null,
    TimeRemainingSeconds: null,
    UmpireID: 20000048,
    UnderPayout: -43,
    Updated: "2024-01-30T04:01:14",
  },
  {
    AlternateID: null,
    Attendance: 18064,
    AwayRotationNumber: 200,
    AwayTeam: "PHO",
    AwayTeamID: 29,
    AwayTeamMoneyLine: 49,
    AwayTeamScore: 43,
    Channel: "TNT",
    CrewChiefID: 20000053,
    DateTime: "2023-10-24T22:00:00",
    DateTimeUTC: "2023-10-25T02:00:00",
    Day: "2023-10-24T00:00:00",
    GameEndDateTime: "2023-10-25T00:44:22",
    GameID: 19594,
    GlobalAwayTeamID: 20000029,
    GlobalGameID: 20019594,
    GlobalHomeTeamID: 20000026,
    HomeRotationNumber: 200,
    HomeTeam: "GS",
    HomeTeamID: 26,
    HomeTeamMoneyLine: -59,
    HomeTeamScore: 41,
    InseasonTournament: false,
    IsClosed: true,
    LastPlay: "Scrambled",
    NeutralVenue: false,
    OverPayout: -44,
    OverUnder: 93.3,
    PointSpread: -1.2,
    PointSpreadAwayTeamMoneyLine: -43,
    PointSpreadHomeTeamMoneyLine: -45,
    Quarter: null,
    Quarters: [],
    RefereeID: 20000067,
    Season: 2024,
    SeasonType: 1,
    SeriesInfo: null,
    StadiumID: 51,
    Status: "Final",
    TimeRemainingMinutes: null,
    TimeRemainingSeconds: null,
    UmpireID: 20000049,
    UnderPayout: -44,
    Updated: "2024-01-30T04:01:14",
  },
];
