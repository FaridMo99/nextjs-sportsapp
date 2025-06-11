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
      <Table className="bg-secondary rounded-2xl font-bold text-lg outline-1 outline-secondary-light overflow-clip">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-white">Rank</TableHead>
            <TableHead className="w-[100px] text-white">Name</TableHead>
            <TableHead className="text-white">Wins</TableHead>
            <TableHead className="text-white">Losses</TableHead>
            <TableHead className="text-white">Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isWesternConference
            ? westernConference.map((team) => (
                <TableRow
                  className={`bg-${team.Name}-main text-${team.Name}-second`}
                  key={team.Name}
                >
                  <TableCell>{team.position}</TableCell>
                  <TableCell>{team.Name}</TableCell>
                  <TableCell>{team.Wins}</TableCell>
                  <TableCell>{team.Losses}</TableCell>
                  <TableCell>{team.Percentage}</TableCell>
                </TableRow>
              ))
            : easternConference.map((team) => (
                <TableRow className={`text-${team.Name}-main`} key={team.Name}>
                  <TableCell>{team.position}</TableCell>
                  <TableCell>{team.Name}</TableCell>
                  <TableCell>{team.Wins}</TableCell>
                  <TableCell>{team.Losses}</TableCell>
                  <TableCell>{team.Percentage}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Standings;
