import React from "react";
import "server-only";
import { getTeamById, getTeamGamesById } from "@/lib/getTeamById";
import SeasonStatisticsTabs from "./SeasonStatisticsTabs";
import getData from "@/lib/getData";

async function SeasonStatistics({ season, id }) {
  const [seasonStats, seasonGamesLogs] = await Promise.all([
    getData(
      `https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/${season}?key=${process.env.API_KEY}`,
    ),
    getData(
      `https://api.sportsdata.io/v3/nba/scores/json/TeamGameStatsBySeason/${season}/${id}/all?key=${process.env.API_KEY}`,
    ),
  ]);

  const logs = getTeamGamesById(seasonGamesLogs, id);
  const teamStats = getTeamById(seasonStats, id);

  return <SeasonStatisticsTabs statistics={teamStats} gameLogs={logs} />;
}

export default SeasonStatistics;
