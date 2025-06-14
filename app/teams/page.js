import React from "react";
import TeamsList from "../../components/teams/TeamsList";
import "server-only";

async function page() {
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/teams?key=${process.env.API_KEY}`,
  );
  const teams = await res.json();

  return <TeamsList teams={teams} />;
}

export default page;
