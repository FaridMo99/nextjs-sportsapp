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
import "server-only";

async function page() {
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/teams?key=${process.env.API_KEY}`,
  );
  const teams = await res.json();

  return (
    <main className="flex-grow p-6  mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        NBA Teams
      </h1>
      <div className="bg-secondary rounded-md  border-1 border-secondary-light">
        <Table className=" font-semibold text-lg">
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
              <TableRow className="hover:bg-transparent" key={team.TeamID}>
                <TableCell className="px-6 py-4">
                  <Link
                    href={`/teams/${team.TeamID}`}
                    className="hover:underline"
                  >
                    {team.Name}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-4">{team.City}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default page;
