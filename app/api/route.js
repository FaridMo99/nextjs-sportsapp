import getData from "@/lib/getData";
import getCurrentSeason from "@/lib/getCurrentSeason";

export async function GET(request) {
  try {
    const season = await getCurrentSeason();

    const [players, teams, games] = await Promise.all([
      getData(
        `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${process.env.API_KEY}`,
      ),
      getData(
        `https://api.sportsdata.io/v3/nba/scores/json/teams?key=${process.env.API_KEY}`,
      ),
      getData(
        `https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}`,
      ),
    ]);

    return new Response(JSON.stringify({ players, teams, games }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
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
