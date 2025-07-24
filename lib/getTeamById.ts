import { TeamGameLog, TeamStat } from "@/app/types";

export function getTeamById(teams: TeamStat[], id: string): TeamStat {
  return teams.find((team) => String(team.TeamID) === id)!;
}

export function getTeamGamesById(
  teams: TeamGameLog[],
  id: string,
): TeamGameLog[] {
  return teams.filter((team) => String(team.TeamID) === id);
}
