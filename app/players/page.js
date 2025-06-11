import React from "react";
import PaginationComp from "@/components/PaginationComp";
import PlayerCard from "@/components/PlayerCard";
import "server-only";

async function page() {
  //const res = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/PlayersActiveBasic?key=${process.env.API_KEY}`)
  //const players = await res.json()

  const players = [
    {
      BirthCity: "St. Louis",
      BirthCountry: "USA",
      BirthDate: "1993-06-28T00:00:00",
      BirthState: "MO",
      FirstName: "Bradley",
      Height: 76,
      Jersey: 3,
      LastName: "Beal",
      Position: "SG",
      Status: "Active",
      Team: "PHO",
      Weight: 207,
    },
    {
      BirthCity: "Akron",
      BirthCountry: "USA",
      BirthDate: "1984-12-30T00:00:00",
      BirthState: "OH",
      FirstName: "LeBron",
      Height: 81,
      Jersey: 6,
      LastName: "James",
      Position: "SF",
      Status: "Active",
      Team: "LAL",
      Weight: 250,
    },
    {
      BirthCity: "Akron",
      BirthCountry: "USA",
      BirthDate: "1988-03-14T00:00:00",
      BirthState: "OH",
      FirstName: "Kevin",
      Height: 82,
      Jersey: 7,
      LastName: "Durant",
      Position: "SF",
      Status: "Active",
      Team: "PHO",
      Weight: 240,
    },
    {
      BirthCity: "Akron",
      BirthCountry: "USA",
      BirthDate: "1988-03-14T00:00:00",
      BirthState: "OH",
      FirstName: "Stephen",
      Height: 75,
      Jersey: 30,
      LastName: "Curry",
      Position: "PG",
      Status: "Active",
      Team: "GSW",
      Weight: 185,
    },
    {
      BirthCity: "Melbourne",
      BirthCountry: "Australia",
      BirthDate: "1992-03-23T00:00:00",
      FirstName: "Kyrie",
      Height: 75,
      Jersey: 11,
      LastName: "Irving",
      Position: "PG",
      Status: "Active",
      Team: "DAL",
      Weight: 195,
    },
  ];

  return (
    <main className="flex flex-col items-center flex-grow overflow-auto p-4 gap-6">
      {players.map((player) => (
        <PlayerCard
          key={player.BirthDate + player.FirstName + player.LastName}
          player={player}
        />
      ))}
      <PaginationComp />
    </main>
  );
}

export default page;
//here i have to mock pagination client side because the API
//doesnt offer these type of endpoints

//add fake pagination

//clicking on player card should intercept modal, refresh sends
//to real page
