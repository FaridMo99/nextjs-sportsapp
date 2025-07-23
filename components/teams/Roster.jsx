import React from "react";
import "server-only";
import PlayerCard from "../PlayerCard";
import Link from "next/link";
import SectionWrapper from "../Home/SectionWrapper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import getData from "@/lib/getData";
import NoDataText from "../NoDataText";

async function Roster({ season, id, teamName, abbr }) {
  const roster = await getData(
    `https://api.sportsdata.io/v3/nba/scores/json/Players/${abbr}?key=${process.env.API_KEY}`,
  );

  if (!roster || roster.length === 0)
    return <NoDataText text="No Players found..." />;

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
