import React from "react";
import "server-only";
import { getTeamById, getTeamGamesById } from "@/lib/getTeamById";
import SeasonStatisticsTabs from "./SeasonStatisticsTabs";
import getData from "@/lib/getData";
import { SeasonProps } from "./Roster";
import { TeamGameLog, TeamStat } from "@/app/types";

async function SeasonStatistics({
  season,
  id,
}: Omit<SeasonProps, "teamName" | "abbr">) {
  const [seasonStats, seasonGamesLogs] = await Promise.all([
    getData<TeamStat[]>(
      `https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/${season}?key=${process.env.API_KEY}`,
    ),
    getData<TeamGameLog[]>(
      `https://api.sportsdata.io/v3/nba/scores/json/TeamGameStatsBySeason/${season}/${id}/all?key=${process.env.API_KEY}`,
    ),
  ]);

  const logs: TeamGameLog[] = getTeamGamesById(seasonGamesLogs, id);
  const teamStats: TeamStat = getTeamById(seasonStats, id);

  return <SeasonStatisticsTabs statistics={teamStats} gameLogs={logs} />;
}

export default SeasonStatistics;
