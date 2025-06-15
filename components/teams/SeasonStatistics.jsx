import React from "react";
import "server-only";
import { getTeamById, getTeamGamesById } from "@/lib/getTeamById";
import SeasonStatisticsTabs from "./SeasonStatisticsTabs";

async function SeasonStatistics({ season, id }) {
  const [seasonStatsRes, seasonGamesLogsRes] = await Promise.all([
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/${season}?key=${process.env.API_KEY}`,
    ),
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/TeamGameStatsBySeason/${season}/${id}/all?key=${process.env.API_KEY}`,
    ),
  ]);
  const [seasonStats, seasonGamesLogs] = await Promise.all([
    seasonStatsRes.json(),
    seasonGamesLogsRes.json(),
  ]);

  const logs = getTeamGamesById(seasonGamesLogs, id);
  const teamStats = getTeamById(seasonStats, id);

  return <SeasonStatisticsTabs statistics={teamStats} gameLogs={logs} />;
}

export default SeasonStatistics;
