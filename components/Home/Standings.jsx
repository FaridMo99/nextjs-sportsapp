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
      <div className="bg-secondary rounded-lg border-1 border-secondary-light">
        <Table className="font-bold text-lg">
          <TableHeader className="hover:bg-transparent">
            <TableRow className="hover:bg-transparent w-full">
              <TableHead className="text-white w-1/10">Rank</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white w-1/10">Wins</TableHead>
              <TableHead className="text-white w-1/10">Losses</TableHead>
              <TableHead className="text-white w-1/10">Pctg</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isWesternConference
              ? westernConference.map((team) => (
                  <TableRow className="hover:bg-transparent" key={team.Name}>
                    <TableCell className="text-white">
                      {team.position}
                    </TableCell>
                    <TableCell>
                      <Link
                        className="hover:underline"
                        href={`/teams/${team.TeamID}`}
                      >
                        {team.Name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-green-500">
                      {team.Wins}
                    </TableCell>
                    <TableCell className="text-red-500">
                      {team.Losses}
                    </TableCell>
                    <TableCell className="text-blue-500">
                      {team.Percentage}
                    </TableCell>
                  </TableRow>
                ))
              : easternConference.map((team) => (
                  <TableRow className="hover:bg-transparent" key={team.Name}>
                    <TableCell className="text-white">
                      {team.position}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/teams/${team.TeamID}`}
                        className="hover:underline"
                      >
                        {team.Name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-green-500">
                      {team.Wins}
                    </TableCell>
                    <TableCell className="text-red-500">
                      {team.Losses}
                    </TableCell>
                    <TableCell className="text-blue-500">
                      {team.Percentage}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Standings;
