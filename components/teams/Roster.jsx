import React from "react";

function Roster({ season, id }) {
  return <section>Roster</section>;
}

export default Roster;
//player details by team (roster)
//Full player bio and details, including injury notes, for all available players by team.
//https://api.sportsdata.io/v3/nba/scores/json/Players/${team}?key=${process.env.API_KEY}
//team as abbreviation like lakers should be LAL
//look how to implement for seasons that arent the current
