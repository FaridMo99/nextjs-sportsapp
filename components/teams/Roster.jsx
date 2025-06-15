import React from "react";
import "server-only";
import PlayerCard from "../PlayerCard";
import Link from "next/link";
import SectionWrapper from "../Home/SectionWrapper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

async function Roster({ season, id, teamName, abbr }) {
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/Players/${abbr}?key=${process.env.API_KEY}`,
  );
  const roster = await res.json();
  console.log(roster);

  if (!roster || roster.length === 0)
    return (
      <p className="text-2xl w-full flex justify-center items-center font-bold">
        No Players found...
      </p>
    );

  return (
    <SectionWrapper title={"Roster:"} teamName={teamName}>
      <ScrollArea
        style={{
          backgroundColor: `var(--${teamName[1]}-main)`,
          border: `2px solid var(--${teamName[1]}-second)`,
        }}
        className="w-full rounded-md border whitespace-nowrap"
      >
        <div className="flex space-x-4 p-4">
          {roster.map((player) => (
            <Link href={`/players/${player.PlayerID}`} key={player.PlayerID}>
              <div className="min-w-[270px]">
                <PlayerCard player={player} />
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </SectionWrapper>
  );
}

export default Roster;

const roooster = [
  {
    BirthCity: "Brooklyn",
    BirthCountry: "USA",
    BirthDate: "1985-06-24T00:00:00",
    BirthState: "NY",
    College: "Southern California",
    Experience: 15,
    FirstName: "Taj",
    GlobalTeamID: 20000002,
    Height: 81,
    Jersey: 67,
    LastName: "Gibson",
    NbaDotComPlayerID: 201959,
    PlayerID: 20000517,
    Position: "PF",
    PositionCategory: "F",
    RotoWirePlayerID: 3035,
    RotoworldPlayerID: 1628,
    Salary: 2087519,
    SportRadarPlayerID: "9c8dc8ee-6207-48d5-81ee-f362f5e17f9b",
    SportsDataID: "",
    SportsDirectPlayerID: 733302,
    StatsPlayerID: 330057,
    Status: "Active",
    Team: "CHA",
    TeamID: 2,
    Weight: 232,
    YahooName: "Taj Gibson",
    YahooPlayerID: 4631,
  },
  {
    BirthCity: "Brooklyn",
    BirthCountry: "USA",
    BirthDate: "1985-06-24T00:00:00",
    BirthState: "NY",
    College: "Southern California",
    Experience: 15,
    FirstName: "Taj",
    GlobalTeamID: 20000002,
    Height: 81,
    Jersey: 67,
    LastName: "Gibson",
    NbaDotComPlayerID: 201959,
    PlayerID: 20000517,
    Position: "PF",
    PositionCategory: "F",
    RotoWirePlayerID: 3035,
    RotoworldPlayerID: 1628,
    Salary: 2087519,
    SportRadarPlayerID: "9c8dc8ee-6207--81ee-f362f5e17f9b",
    SportsDataID: "",
    SportsDirectPlayerID: 733302,
    StatsPlayerID: 330057,
    Status: "Active",
    Team: "CHA",
    TeamID: 2,
    Weight: 232,
    YahooName: "Taj Gibson",
    YahooPlayerID: 4631,
  },
  {
    BirthCity: "Brooklyn",
    BirthCountry: "USA",
    BirthDate: "1985-06-24T00:00:00",
    BirthState: "NY",
    College: "Southern California",
    Experience: 15,
    FirstName: "Taj",
    GlobalTeamID: 20000002,
    Height: 81,
    Jersey: 67,
    LastName: "Gibson",
    NbaDotComPlayerID: 201959,
    PlayerID: 20000517,
    Position: "PF",
    PositionCategory: "F",
    RotoWirePlayerID: 3035,
    RotoworldPlayerID: 1628,
    Salary: 2087519,
    SportRadarPlayerID: "9c8dc8ee-6207-48d5-81ee-",
    SportsDataID: "",
    SportsDirectPlayerID: 733302,
    StatsPlayerID: 330057,
    Status: "Active",
    Team: "CHA",
    TeamID: 2,
    Weight: 232,
    YahooName: "Taj Gibson",
    YahooPlayerID: 4631,
  },
  {
    BirthCity: "Brooklyn",
    BirthCountry: "USA",
    BirthDate: "1985-06-24T00:00:00",
    BirthState: "NY",
    College: "Southern California",
    Experience: 15,
    FirstName: "Taj",
    GlobalTeamID: 20000002,
    Height: 81,
    Jersey: 67,
    LastName: "Gibson",
    NbaDotComPlayerID: 201959,
    PlayerID: 20000517,
    Position: "PF",
    PositionCategory: "F",
    RotoWirePlayerID: 3035,
    RotoworldPlayerID: 1628,
    Salary: 2087519,
    SportRadarPlayerID: "-6207-48d5-81ee-f362f5e17f9b",
    SportsDataID: "",
    SportsDirectPlayerID: 733302,
    StatsPlayerID: 330057,
    Status: "Active",
    Team: "CHA",
    TeamID: 2,
    Weight: 232,
    YahooName: "Taj Gibson",
    YahooPlayerID: 4631,
  },
  {
    BirthCity: "Brooklyn",
    BirthCountry: "USA",
    BirthDate: "1985-06-24T00:00:00",
    BirthState: "NY",
    College: "Southern California",
    Experience: 15,
    FirstName: "Taj",
    GlobalTeamID: 20000002,
    Height: 81,
    Jersey: 67,
    LastName: "Gibson",
    NbaDotComPlayerID: 201959,
    PlayerID: 20000517,
    Position: "PF",
    PositionCategory: "F",
    RotoWirePlayerID: 3035,
    RotoworldPlayerID: 1628,
    Salary: 2087519,
    SportRadarPlayerID: "9c8dc8ee6207-48d5-81ee-f362f5e17f9b",
    SportsDataID: "",
    SportsDirectPlayerID: 733302,
    StatsPlayerID: 330057,
    Status: "Active",
    Team: "CHA",
    TeamID: 2,
    Weight: 232,
    YahooName: "Taj Gibson",
    YahooPlayerID: 4631,
  },
];
