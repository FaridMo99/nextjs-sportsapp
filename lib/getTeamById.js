export function getTeamById(teams, id) {
  return teams.find((team) => String(team.TeamID) === id);
}

export function getTeamGamesById(teams, id) {
  return teams.filter((team) => String(team.TeamID) === id);
}
