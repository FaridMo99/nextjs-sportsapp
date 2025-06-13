import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TeamsList({ teams }) {
  return (
    <main className="flex-grow p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        NBA Teams
      </h1>
      <Table className="bg-secondary rounded-md font-semibold text-lg overflow-hidden  outline-1 outline-secondary-light shadow-lg">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-6 py-3 text-left text-white">
              Team
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-white">
              City
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow
              key={team.TeamID}
              style={{
                color: `var(--${team.Name === "76ers" ? "Sixers" : team.Name}-main)`,
                backgroundColor: `var(--${team.Name === "76ers" ? "Sixers" : team.Name}-second)`,
              }}
              className="cursor-pointer hover:brightness-90 transition duration-200"
            >
              <TableCell className="px-6 py-4">
                <Link
                  href={`/teams/${team.TeamID}`}
                  className="block w-full h-full"
                >
                  {team.Name}
                </Link>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Link
                  href={`/teams/${team.TeamID}`}
                  className="block w-full h-full"
                >
                  {team.City}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default TeamsList;
