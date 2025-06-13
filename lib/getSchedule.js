export function getScheduleById(schedule, id) {
  return schedule
    .filter((game) => game.HomeId === id || game.AwayId === id)
    .sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime))
    .sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));
}
