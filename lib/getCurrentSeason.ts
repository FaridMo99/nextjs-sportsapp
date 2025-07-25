import { cache } from "react";

type SeasonType = {
  Season: number;
  StartYear: number;
  EndYear: number;
  Description: string;
  RegularSeasonStartDate: string;
  PostSeasonStartDate: string;
  SeasonType: string;
  ApiSeason: string;
};

export type SeasonMessage = "last" | "current";

export type SeasonResponse = {
  season: number;
  message:SeasonMessage;
};

export default async function getCurrentSeason(): Promise<SeasonResponse> {
  const res: Response = await fetch(
    `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${process.env.API_KEY}`,
  );

  if (!res.ok) {
    if (res.status === 403 && res.statusText.toLowerCase().includes("quota")) {
      throw new Error(
        "We've reached the API's usage limit. Live stats will be back soon—please try again later.",
      );
    }

    throw new Error(`${res.status}, ${res.statusText}`);
  }

  const season: SeasonType = await res.json();

  const testFetch = await fetch(
    `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season.Season}?key=${process.env.API_KEY}`,
  );
  const testData = await testFetch.json();

  if (testData.length === 0) {
    return {
      season: season.Season - 1,
      message: "last",
    };
  }

  return {
    season: season.Season,
    message: "current",
  };
}

export const getCurrentSeasonCached = cache(
  async function getCurrentSeasonCached(): Promise<SeasonResponse> {
    const res: Response = await fetch(
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

    const season: SeasonType = await res.json();

    const testFetch = await fetch(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season.Season}?key=${process.env.API_KEY}`,
    );
    const testData = await testFetch.json();

    if (testData.length === 0) {
      return {
        season: season.Season - 1,
        message: "last",
      };
    }

    return {
      season: season.Season,
      message: "current",
    };
  },
);
//here i have to make a test fetch and look if it returns a empty array for current
//season since there could be the issue that currentseason is updated but there is no
//data yet in the other api routes for the current season
