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
  //const {playerId} = await params;

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
      <FirstCard player={player} teamName={teamName} />
      {/*<SecondCard player={seasonStats} teamName={teamName}/>*/}
      {/*<ThirdCard player={careerStats} teamName={teamName}/>*/}
      {/*<FourthCard player={accolades} teamName={teamName}/>*/}
      {/*<FifthCard player={news} teamName={teamName}/>*/}
    </main>
  );
}

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
