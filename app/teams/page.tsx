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
import getData from "@/lib/getData";
import getCurrentSeason from "@/lib/getCurrentSeason";
import NoDataText from "@/components/NoDataText";
import { Metadata } from "next";
import { Team } from "../types";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Teams",
  description: "Information about all current Teams",
  authors: [{ name: "Farid Mohseni" }],
  openGraph: {
    title: "Teams | HoopTracker",
    description: "Information about all current Teams",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/teams`,
    siteName: "HoopTracker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teams | HoopTracker",
    description: "Information about all current Teams",
  },
};

async function page() {
  const teams = await getData<Team[]>(
    `https://api.sportsdata.io/v3/nba/scores/json/teams?key=${process.env.API_KEY}`,
  );

  if (teams.length === 0) return <NoDataText text="No Teams found..." />;
  const {season} = await getCurrentSeason();

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
                    href={`/teams/${team.TeamID}/${season}`}
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
