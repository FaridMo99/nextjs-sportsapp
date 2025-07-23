import { cache } from "react";

export default async function getCurrentSeason() {
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${process.env.API_KEY}`,
  );

  if (!res.ok) {
    if (
      res.status === 403 &&
      res.statusText.toLowerCase().includes("quota")
    ) {
      throw new Error(
        "We've reached the API's usage limit. Live stats will be back soon—please try again later.",
      );
    }

    throw new Error(`${res.status}, ${res.statusText}`);
  }

  const season = await res.json();
  return season.Season;
}

export const getCurrentSeasonCached = cache(
  async function getCurrentSeasonCached() {
    const res = await fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${process.env.API_KEY}`,
    );

    if (!res.ok) {
      if (
        res.status === 403 &&
      res.statusText.toLowerCase().includes("quota")
      ) {
        throw new Error(
          "We've reached the API's usage limit. Live stats will be back soon—please try again later.",
        );
      }

      throw new Error(`${res.status}, ${res.statusText}`);
    }

    const season = await res.json();
    return season.Season;
  },
);
