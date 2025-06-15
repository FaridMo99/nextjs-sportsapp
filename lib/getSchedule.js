export function getScheduleById(schedule, id) {
  return schedule
    .filter((game) => game.HomeTeamID === id || game.AwayTeamID === id)
    .sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));
}
