"use client";
import React, { useState } from "react";
import { Switch } from "../ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

function sortTeamsToConference(conference, teams) {
  const conferenceArray = teams.filter(
    (team) => team.Conference === conference,
  );

  conferenceArray.sort((a, b) => {
    if (b.Percentage !== a.Percentage) {
      return b.Percentage - a.Percentage;
    }
    return a.Losses - b.Losses;
  });

  return conferenceArray.map((team, index) => ({
    ...team,
    position: index + 1,
  }));
}

function Standings({ teams }) {
  const easternConference = sortTeamsToConference("Eastern", teams);
  const westernConference = sortTeamsToConference("Western", teams);
  const [isWesternConference, setConference] = useState(true);

  if (teams.length === 0) return <p>No Standings found...</p>;
  console.log(teams);
  return (
    <>
      <div className="absolute top-6 font-bold text-secondary-light text-xl right-6 justify-between items-center w-24 h-6 flex">
        {isWesternConference ? <p>West</p> : <p>East</p>}
        <Switch
          aria-label="Switch Conference"
          onClick={() => {
            setConference((pre) => !pre);
          }}
        />
      </div>
      <Table className="bg-secondary rounded-sm font-bold text-lg overflow-clip outline-1 outline-secondary-light">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-white">Rank</TableHead>
            <TableHead className="w-[100px] text-white">Name</TableHead>
            <TableHead className="text-white">Wins</TableHead>
            <TableHead className="text-white">Losses</TableHead>
            <TableHead className="text-white">Pctg</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isWesternConference
            ? westernConference.map((team) => (
                <TableRow
                  style={{
                    color: `var(--${team.Name}-main)`,
                  }}
                  key={team.Name}
                >
                  <TableCell className="text-white">{team.position}</TableCell>
                  <TableCell>
                    <Link href={`/teams/${team.TeamID}`}>{team.Name}</Link>
                  </TableCell>
                  <TableCell>{team.Wins}</TableCell>
                  <TableCell>{team.Losses}</TableCell>
                  <TableCell>{team.Percentage.toFixed(2)}</TableCell>
                </TableRow>
              ))
            : easternConference.map((team) => (
                <TableRow
                  style={{
                    color: `var(--${team.Name === "76ers" ? "Sixers" : team.Name}-main)`,
                  }}
                  key={team.Name}
                >
                  <TableCell className="text-white">{team.position}</TableCell>
                  <TableCell>
                    <Link href={`/teams/${team.TeamID}`}>{team.Name}</Link>
                  </TableCell>
                  <TableCell>{team.Wins}</TableCell>
                  <TableCell>{team.Losses}</TableCell>
                  <TableCell>{team.Percentage.toFixed(2)}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Standings;
