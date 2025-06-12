import React from "react";
import { User2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function FirstCard({ player, teamName }) {
  return (
    <Card
      as="section"
      className="w-full relative"
      style={{
        backgroundColor: `var(--${teamName[1]}-main)`,
        color: `var(--${teamName[1]}-second)`,
        border: `2px solid var(--${teamName[1]}-second)`,
      }}
    >
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">
          {player.FirstName} {player.LastName}
        </CardTitle>
        <User2 size={60} aria-hidden="true" />
      </CardHeader>
      <CardContent className="font-bold">
        <CardDescription className="mb-2 font-semibold">Bio:</CardDescription>
        <p>Status: {player.Status}</p>
        <p>In League: {player.Experience} years</p>
        <p>Team: {player.Team}</p>
        <p>Position: {player.Position}</p>
        <p>Number: #{player.Jersey}</p>
        <p>Salary (yearly): {player.Salary}$</p>
        <p>
          Height: {Math.floor(player.Height / 12)}&apos; {player.Height % 12}
          &quot;
        </p>
        <p>Weight: {player.Weight} lbs</p>
        <p>Birth Date: {new Date(player.BirthDate).toLocaleDateString()}</p>
        <p>
          Birth Place: {player.BirthCity}, {player.BirthState},{" "}
          {player.BirthCountry}
        </p>
        <p>College: {player.College || "N/A"}</p>
      </CardContent>
    </Card>
  );
}

export default FirstCard;
