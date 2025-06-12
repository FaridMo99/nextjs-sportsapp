import React from "react";
import { User2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function FirstCard({ bio, teamName }) {
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
          {bio.FirstName} {bio.LastName}
        </CardTitle>
        <User2 size={60} aria-hidden="true" />
      </CardHeader>
      <CardContent className="font-bold">
        <CardDescription className="mb-2 font-semibold">Bio:</CardDescription>
        <p>Status: {bio.Status}</p>
        <p>In League: {bio.Experience} years</p>
        <p>Team: {bio.Team}</p>
        <p>Position: {bio.Position}</p>
        <p>Number: #{bio.Jersey}</p>
        <p>Salary (yearly): {bio.Salary}$</p>
        <p>
          Height: {Math.floor(bio.Height / 12)}&apos; {bio.Height % 12}
          &quot;
        </p>
        <p>Weight: {bio.Weight} lbs</p>
        <p>Birth Date: {new Date(bio.BirthDate).toLocaleDateString()}</p>
        <p>
          Birth Place: {bio.BirthCity}, {bio.BirthState}, {bio.BirthCountry}
        </p>
        <p>College: {bio.College || "N/A"}</p>
      </CardContent>
    </Card>
  );
}

export default FirstCard;
