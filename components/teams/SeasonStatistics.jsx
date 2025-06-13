import React from "react";
import "server-only";
import { getTeamById, getTeamGamesById } from "@/lib/getTeamById";
import SeasonStatisticsTabs from "./SeasonStatisticsTabs";

async function SeasonStatistics({ season, id }) {
  //const [seasonStatsRes, seasonGamesLogsRes] = await Promise.all([fetch(`https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/${season}?key=${process.env.API_KEY}`), fetch(`https://api.sportsdata.io/v3/nba/scores/json/TeamGameStatsBySeason/${season}/${id}/all?key=${process.env.API_KEY}`)])
  //const [seasonStats, seasonGamesLogs] = await Promise.all([seasonStatsRes.json(),seasonGamesLogsRes.json()])

  //const logs = getTeamGamesById(seasonGamesLogs, id)
  //const teamStats = getTeamById(seasonStats, id)

  return (
    <section className="w-full">
      <SeasonStatisticsTabs statistics={teamStats} gameLogs={logs} />
    </section>
  );
}

export default SeasonStatistics;
//each game should be a link to schedule/[id]

const logs = [
  {
    Assists: 39.2,
    AssistsPercentage: null,
    BlockedShots: 5.6,
    BlocksPercentage: null,
    DateTime: "2024-04-14T13:00:00",
    Day: "2024-04-14T00:00:00",
    DefensiveRebounds: 33.3,
    DefensiveReboundsPercentage: null,
    DoubleDoubles: 0,
    EffectiveFieldGoalsPercentage: 64.6,
    FantasyPoints: 272.9,
    FantasyPointsDraftKings: 289.9,
    FantasyPointsFanDuel: 288.3,
    FantasyPointsFantasyDraft: 289.9,
    FantasyPointsYahoo: 288.3,
    FieldGoalsAttempted: 122.4,
    FieldGoalsMade: 58.2,
    FieldGoalsPercentage: 56.5,
    FreeThrowsAttempted: 11.9,
    FreeThrowsMade: 11.9,
    FreeThrowsPercentage: 118.8,
    GameID: 20588,
    Games: 1,
    GlobalGameID: 20020588,
    GlobalOpponentID: 20000009,
    GlobalTeamID: 20000001,
    HomeOrAway: "AWAY",
    IsClosed: false,
    IsGameOver: true,
    LineupConfirmed: null,
    LineupStatus: "Scrambled",
    Losses: 1,
    Minutes: 285,
    Name: "Washington Wizards",
    OffensiveRebounds: 11.3,
    OffensiveReboundsPercentage: null,
    Opponent: "BOS",
    OpponentID: 9,
    PersonalFouls: 19,
    PlayerEfficiencyRating: null,
    PlusMinus: -59.4,
    Points: 144.9,
    Possessions: 123.9,
    Rebounds: 42.8,
    Season: 2024,
    SeasonType: 1,
    Seconds: 0,
    StatID: 1251577,
    Steals: 10.7,
    StealsPercentage: null,
    Team: "WAS",
    TeamID: 1,
    ThreePointersAttempted: 45.1,
    ThreePointersMade: 16.6,
    ThreePointersPercentage: 43.7,
    TotalReboundsPercentage: null,
    TripleDoubles: 0,
    TrueShootingAttempts: 127.6,
    TrueShootingPercentage: 67.4,
    TurnOversPercentage: null,
    Turnovers: 13.1,
    TwoPointersAttempted: 77.2,
    TwoPointersMade: 41.6,
    TwoPointersPercentage: 63.9,
    Updated: "2024-04-17T04:00:09",
    UsageRatePercentage: null,
    Wins: 0,
  },
];

const teamStats = {
  Assists: 736.8,
  BlockedShots: 124.7,
  DefensiveRebounds: 892,
  DoubleDoubles: 45.3,
  EffectiveFieldGoalsPercentage: 18.3,
  FieldGoalsAttempted: 2563.4,
  FieldGoalsMade: 1192.8,
  FieldGoalsPercentage: 15.7,
  FreeThrowsAttempted: 644.2,
  FreeThrowsMade: 513.8,
  FreeThrowsPercentage: 26.9,
  Games: 82,
  Losses: 46,
  Minutes: 6707,
  Name: "Atlanta Hawks",
  OffensiveRebounds: 346.1,
  PersonalFouls: 514.4,
  PlusMinus: -304.2,
  Points: 3279.6,
  Possessions: 2777.5,
  Rebounds: 1238.1,
  Season: 2024,
  Seconds: 19,
  StatID: 1115404,
  Steals: 207.9,
  StealsPercentage: null,
  Team: "ATL",
  TeamID: 3,
  ThreePointersAttempted: 1045.1,
  ThreePointersMade: 380.2,
  ThreePointersPercentage: 12.3,
  TripleDoubles: 0.2,
  TrueShootingAttempts: 2846.9,
  TrueShootingPercentage: 19.5,
  Turnovers: 353.5,
  TwoPointersAttempted: 1518.3,
  TwoPointersMade: 812.6,
  TwoPointersPercentage: 18.1,
  Wins: 36,
};
