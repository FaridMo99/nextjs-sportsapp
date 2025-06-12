import React from "react";
import getCurrentSeason from "@/lib/getCurrentSeason";
import Schedule from "./Schedule";
import Roster from "./Roster";
import SeasonStatistics from "./SeasonStatistics";

async function page({ params }) {
  const { teamID } = await params;
  //const currentSeason = await getCurrentSeason()

  return (
    <main>
      <Schedule schedule={""} />
      <Roster roster={""} />
      <SeasonStatistics seasonStatistics={""} />
    </main>
  );
}

export default page;

//sections:
// schedule,
// roster,
// stats
//overall season stats with arrow on side, clicking on arrow opens all games
//each game is a link to schedule/[id]

//seasons picker for season then renders same sections
// with chosen season stats

//schedules
//Home and away teams, date and time, season type and week etc. are included. Also includes gameday information. This includes full stadium information (capacity, lat/long, surface etc.), top-line betting information (spread, moneyline, total), weather conditions, and broadcast information.
//https://api.sportsdata.io/v3/nba/scores/json/Games/${season}?key=${process.env.API_KEY}
//filter this to get only current teams games

//player details by team (roster)
//Full player bio and details, including injury notes, for all available players by team.
//https://api.sportsdata.io/v3/nba/scores/json/Players/${team}?key=${process.env.API_KEY}
//team as abbreviation like lakers should be LAL
//look how to implement for seasons that arent the current

//Team Season Stats
//Returns all season-long stats (i.e. the season total, not each individual game record) for all teams (aggregated from all players) for a given season.
//https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/${season}?key=${process.env.API_KEY}

//Team Game Logs by Season
//Game by game log of total team statistics.
//https://api.sportsdata.io/v3/nba/scores/json/TeamGameStatsBySeason/${season}/${teamID}/all?key=${process.env.API_KEY}
