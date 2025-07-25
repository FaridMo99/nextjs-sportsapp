import getData from "@/lib/getData";
import { PlayerInfo, Team } from "../types";
import getCurrentSeason, { SeasonResponse } from "@/lib/getCurrentSeason";

export type SearchResponse = {
  players: PlayerInfo[];
  teams: Team[];
  season: SeasonResponse;
};

export async function GET(): Promise<Response> {
  try {
    const [players, teams, season] = await Promise.all([
      getData<PlayerInfo[]>(
        `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`
      ),
      getData<Team[]>(
        `https://api.sportsdata.io/v3/nba/scores/json/teams?key=${process.env.API_KEY}`
      ),
      getCurrentSeason()
    ]);

    return new Response(
      JSON.stringify({ players, teams, season } satisfies SearchResponse),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch Data. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
