import { Game } from "@/app/types";

export function getScheduleById(schedule: Game[], id: number): Game[] {
  return schedule
    .filter((game) => game.HomeTeamID === id || game.AwayTeamID === id)
    .sort(
      (a, b) => new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime(),
    );
}
