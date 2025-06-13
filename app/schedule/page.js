import React from "react";
import getCurrentSeason from "@/lib/getCurrentSeason";

async function page() {
  //const season = getCurrentSeason()
  //const res = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Games/${2024}?key=${process.env.API_KEY}`)
  //const schedule = await res.json()
  return <div>schedule</div>;
}

export default page;

//structure
//basepath shows current week with today highlighted and past days grey

//nested dynamic routes
//By Date

//By Team

// By Month

//By Id, this should just be to display game details, no separate route

const schedule = [
  {
    AlternateID: null,
    Attendance: 16129,
    AwayRotationNumber: 200,
    AwayTeam: "ATL",
    AwayTeamID: 3,
    AwayTeamMoneyLine: -70,
    AwayTeamScore: 44,
    Channel: "BSSE",
    CrewChiefID: 20000012,
    DateTime: "2023-10-25T19:00:00",
    DateTimeUTC: "2023-10-25T23:00:00",
    Day: "2023-10-25T00:00:00",
    GameEndDateTime: "2023-10-25T21:34:49",
    GameID: 19595,
    GlobalAwayTeamID: 20000003,
    GlobalGameID: 20019595,
    GlobalHomeTeamID: 20000002,
    HomeRotationNumber: 201,
    HomeTeam: "CHA",
    HomeTeamID: 2,
    HomeTeamMoneyLine: 58,
    HomeTeamScore: 46,
    InseasonTournament: false,
    IsClosed: true,
    LastPlay: "Scrambled",
    NeutralVenue: false,
    OverPayout: -44,
    OverUnder: 93.9,
    PointSpread: 0.7,
    PointSpreadAwayTeamMoneyLine: -43,
    PointSpreadHomeTeamMoneyLine: -44,
    Quarter: null,
    Quarters: [],
    RefereeID: 20000047,
    Season: 2024,
    SeasonType: 1,
    SeriesInfo: null,
    StadiumID: 2,
    Status: "Final",
    TimeRemainingMinutes: null,
    TimeRemainingSeconds: null,
    UmpireID: 20000005,
    UnderPayout: -44,
    Updated: "2024-01-30T04:01:21",
  },
];
