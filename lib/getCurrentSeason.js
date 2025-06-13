export default async function getCurrentSeason() {
  const seasonResponse = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${process.env.API_KEY}`,
  );
  const season = await seasonResponse.json();

  return season.Season;
}
