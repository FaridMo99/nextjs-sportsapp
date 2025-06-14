export default function getStatLeaders(players) {
  const totalStats = {
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

  const perGameStats = {
    pointsPerGame: "Points",
    reboundsPerGame: "Rebounds",
    assistsPerGame: "Assists",
    stealsPerGame: "Steals",
    blocksPerGame: "BlockedShots",
    threesPerGame: "ThreePointersMade",
  };

  const playersWithPerGame = players.map((p) => {
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

  const leaders = {
    total: {},
    perGame: {},
  };

  for (const [key, statKey] of Object.entries(totalStats)) {
    leaders.total[key] = players.reduce(
      (top, current) =>
        current[statKey] > (top?.[statKey] ?? -Infinity) ? current : top,
      null,
    );
  }

  for (const [key, statKey] of Object.entries(perGameStats)) {
    leaders.perGame[key] = playersWithPerGame.reduce(
      (top, current) =>
        current[statKey] > (top?.[statKey] ?? -Infinity) ? current : top,
      null,
    );
  }

  return leaders;
}
