export default async function sitemap() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  const [teamsRes, playersRes, gamesRes] = await Promise.all([
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/teams?key=${process.env.API_KEY}`,
    ),
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/PlayersActiveBasic?key=${process.env.API_KEY}`,
    ),
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}`,
    ),
  ]);
  const [teams, players, games] = await Promise.all([
    teamsRes.json(),
    playersRes.json(),
    gamesRes.json(),
  ]);

  const staticRoutes = [
    {
      url: domain,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${domain}/players`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${domain}/teams`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${domain}/schedule`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${domain}/statleader`,
      lastModified: new Date(),
      priority: 0.7,
    },
  ];

  const playerRoutes = players.map((player) => ({
    url: `${domain}/players/${player.PlayerID}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const teamRoutes = teams.map((team) => ({
    url: `${domain}/teams/${team.TeamID}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const gameRoutes = games.map((game) => ({
    url: `${domain}/schedule/${game.GameID}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [...staticRoutes, ...playerRoutes, ...teamRoutes, ...gameRoutes];
}
