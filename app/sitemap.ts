import getCurrentSeason from "@/lib/getCurrentSeason";
import getData from "@/lib/getData";
import { Game, Player, Team } from "./types";

export default async function sitemap() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  const season = await getCurrentSeason();

  const [teams, players, games] = await Promise.all([
    getData<Team[]>(
      `https://api.sportsdata.io/v3/nba/scores/json/teams?key=${process.env.API_KEY}`,
    ),
    getData<Player[]>(
      `https://api.sportsdata.io/v3/nba/scores/json/PlayersActiveBasic?key=${process.env.API_KEY}`,
    ),
    getData<Game[]>(
      `https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}`,
    ),
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
