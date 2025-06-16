import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import LiveTag from "@/components/LiveTag";

function GameCard({ game }) {
  const {
    Status,
    DateTime,
    HomeTeam,
    HomeTeamScore,
    AwayTeam,
    AwayTeamScore,
    Channel,
    OverUnder,
    PointSpread,
    AwayTeamID,
    HomeTeamID,
  } = game;

  const formattedDate = format(new Date(DateTime), "PPP p");

  return (
    <Card
      as="section"
      className="w-full mx-auto relative bg-secondary border-secondary-light text-white"
    >
      {Status === "InProgress" && <LiveTag />}
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {AwayTeam} @ {HomeTeam}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {formattedDate} &middot; Channel: {Channel || "N/A"} &middot; Home:
          {HomeTeam}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between font-semibold text-lg">
          <Link href={`/teams/${AwayTeamID}`} className="hover:underline">
            <p>{AwayTeam}</p>
          </Link>
          <p>{AwayTeamScore}</p>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <Link href={`/teams/${HomeTeamID}`} className="hover:underline">
            <p>{HomeTeam}</p>
          </Link>
          <p>{HomeTeamScore}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>
            Status: <strong>{Status}</strong>
          </p>
          <p>Over/Under: {OverUnder}</p>
          <p>Point Spread: {PointSpread}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default GameCard;
