import React from "react";
import "server-only";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User2 } from "lucide-react";
import transformTeamName from "@/lib/transformTeamName";
import FirstCard from "./FirstCard";
import SecondCard from "./SecondCard";
import ThirdCard from "./ThirdCard";
import FourthCard from "./FourthCard";
import FifthCard from "./FifthCard";

function getPlayer(players, id) {
  return players.find((player) => player.PlayerID === Number(id));
}

export default async function Page({ params }) {
  const { playerId } = await params;

  //const currentSeasonRes = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${process.env.API_KEY}`)
  //const currentSeason = await seasonRes.json()

  //const biosRes = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`);
  //const bios = await biosRes.json();

  //const allSeasonStatsRes = await fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season}?key=${process.env.API_KEY}`)
  //const allSeasonStats = await allSeasonStatsRes.json();

  //const newsRes = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/NewsByPlayerID/${playerId}?key=${process.env.API_KEY}`)
  //const news = await newsRes.json();

  //const careerRes = await fetch(``)
  //const career = await careerRes.json();

  //const accoladesRes = await fetch(``)
  //const allAccolades = await accoladesRes.json();

  //const bio = getPlayer(bios, playerId);
  //const seasonStats = getPlayer(allSeasonStats, playerId);
  //const careerStats = getPlayer(, playerId);
  //const accolades = getPlayer(, playerId);

  const teamName = transformTeamName(player.Team);

  return (
    <main className="flex-grow overflow-auto rounded-2xl p-4 m-3">
      <FirstCard bio={player} teamName={teamName} />
      <SecondCard seasonStats={seasonStats} teamName={teamName} />
      {/*<ThirdCard player={careerStats} teamName={teamName}/>*/}
      {/*<FourthCard player={accolades} teamName={teamName}/>*/}
      <FifthCard player={news} teamName={teamName} />
    </main>
  );
}

const seasonStats = {
  Assists: 162.7,
  AssistsPercentage: 13.8,
  BlockedShots: 16.6,
  BlocksPercentage: 0.5,
  DefensiveRebounds: 109.3,
  DefensiveReboundsPercentage: 4.1,
  DoubleDoubles: 1.1,
  EffectiveFieldGoalsPercentage: 35.7,
  FieldGoalsAttempted: 451.3,
  FieldGoalsMade: 231.5,
  FieldGoalsPercentage: 31.5,
  FreeThrowsAttempted: 82.3,
  FreeThrowsMade: 66.9,
  FreeThrowsPercentage: 49.9,
  Games: 53,
  IsClosed: false,
  Minutes: 1084,
  Name: "Bradley Beal",
  OffensiveRebounds: 33.2,
  OffensiveReboundsPercentage: 1.4,
  PersonalFouls: 78,
  PlayerEfficiencyRating: 12.8,
  PlusMinus: 65.7,
  Points: 591.9,
  Rebounds: 142.4,
  Season: 2024,
  Seconds: 27,
  Started: 53,
  Steals: 31.9,
  StealsPercentage: 0.5,
  ThreePointersAttempted: 144.3,
  ThreePointersMade: 62,
  ThreePointersPercentage: 26.4,
  TotalReboundsPercentage: 2.8,
  TripleDoubles: 0,
  TrueShootingAttempts: 487.5,
  TrueShootingPercentage: 37.3,
  TurnOversPercentage: 5.3,
  Turnovers: 80.4,
  TwoPointersAttempted: 307,
  TwoPointersMade: 169.5,
  TwoPointersPercentage: 33.9,
  Updated: "2024-06-25T22:42:38",
  UsageRatePercentage: 14,
};

const player = {
  PlayerID: 20000441,
  Status: "Active",
  Team: "PHO",
  BirthCity: "St. Louis",
  BirthCountry: "USA",
  BirthDate: "1993-06-28T00:00:00",
  BirthState: "MO",
  College: "Florida",
  Experience: 12,
  FirstName: "Bradley",
  GlobalTeamID: 20000029,
  Height: 76,
  Jersey: 3,
  LastName: "Beal",
  Position: "SG",
  Salary: 50203930,
  Weight: 207,
};

const news = [
  {
    Author: "Staff",
    Categories: "Injuries, Top-Headlines",
    Content:
      "Phoenix Suns forward Bradley Beal (ankle) won't play on Saturday against the Pistons. The veteran was listed as doubtful, so fantasy managers already had a feeling this was coming. With Beal out again, Ryan Dunn will remain in the starting lineup, with the 22-year-old recently amassing 18 points, 11 rebounds, and one block versus the Washington Wizards.",
    NewsID: 102412,
    OriginalSource: "NBA Injury Report",
    OriginalSourceUrl:
      "https://ak-static.cms.nba.com/referee/injury/Injury-Report_2025-01-18_03PM.pdf",
    PlayerID: 20000441,
    PlayerID2: null,
    Source: "RotoBaller",
    Team: "PHO",
    Team2: null,
    TeamID: 29,
    TeamID2: null,
    TermsOfUse:
      "RotoBaller Premium News feeds are provided for commercial use and in accordance to the terms set forth within your SportsDataIO's commercial agreement. Please contact sales@sportsdata.io with any questions.",
    TimeAgo: "4 months ago",
    Title: "Bradley Beal Ruled Out Versus Detroit",
    Updated: "2025-01-18T20:55:03",
    Url: "https://www.rotoballer.com/player-",
  },
];
