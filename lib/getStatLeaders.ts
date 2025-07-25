import { ExtendedPlayerSeasonStat, PlayerSeasonStat } from "@/app/types";

type TotalStatKeys =
  | "points"
  | "rebounds"
  | "assists"
  | "steals"
  | "blocks"
  | "threePointersMade"
  | "fgPercentage"
  | "ftPercentage"
  | "threePtPercentage";

type PerGameStatKeys =
  | "pointsPerGame"
  | "reboundsPerGame"
  | "assistsPerGame"
  | "stealsPerGame"
  | "blocksPerGame"
  | "threesPerGame";

type StatLeaders = {
  total: Record<TotalStatKeys, ExtendedPlayerSeasonStat>;
  perGame: Record<PerGameStatKeys, ExtendedPlayerSeasonStat>;
};

export default function getStatLeaders(
  players: PlayerSeasonStat[],
): StatLeaders {
  const totalStats: Record<TotalStatKeys, keyof PlayerSeasonStat> = {
    points: "Points",
    rebounds: "Rebounds",
    assists: "Assists",
    steals: "Steals",
    blocks: "BlockedShots",
    threePointersMade: "ThreePointersMade",
    fgPercentage: "FieldGoalsPercentage",
    ftPercentage: "FreeThrowsPercentage",
    threePtPercentage: "ThreePointersPercentage",
  };

  const perGameStats: Record<PerGameStatKeys, keyof ExtendedPlayerSeasonStat> =
    {
      pointsPerGame: "pointsPerGame",
      reboundsPerGame: "reboundsPerGame",
      assistsPerGame: "assistsPerGame",
      stealsPerGame: "stealsPerGame",
      blocksPerGame: "blocksPerGame",
      threesPerGame: "threesPerGame",
    };

  const playersWithPerGame: ExtendedPlayerSeasonStat[] = players.map((p) => {
    const games = p.Games || 1;
    return {
      ...p,
      pointsPerGame: p.Points / games,
      reboundsPerGame: p.Rebounds / games,
      assistsPerGame: p.Assists / games,
      stealsPerGame: p.Steals / games,
      blocksPerGame: p.BlockedShots / games,
      threesPerGame: p.ThreePointersMade / games,
    };
  });

  const leaders: StatLeaders = {
    total: {} as Record<TotalStatKeys, ExtendedPlayerSeasonStat>,
    perGame: {} as Record<PerGameStatKeys, ExtendedPlayerSeasonStat>,
  };

  for (const [key, statKey] of Object.entries(totalStats) as [
    TotalStatKeys,
    keyof PlayerSeasonStat,
  ][]) {
    leaders.total[key] = playersWithPerGame.reduce((top, current) =>
      current[statKey]! > top[statKey]! ? current : top,
    );
  }

  for (const [key, statKey] of Object.entries(perGameStats) as [
    PerGameStatKeys,
    keyof ExtendedPlayerSeasonStat,
  ][]) {
    leaders.perGame[key] = playersWithPerGame.reduce((top, current) =>
      current[statKey]! > top[statKey]! ? current : top,
    );
  }

  return leaders;
}
