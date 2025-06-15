import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function ScheduleDays({ daysData }) {
  const dayKeys = Object.keys(daysData).sort();

  console.log(daysData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {dayKeys.map((day) => (
        <Card
          key={day}
          className="rounded-xs border-black bg-secondary-light h-auto w-full"
        >
          <CardContent className="p-4">
            <h3 className="font-extrabold text-xl text-white mb-2">
              {new Date(day).toDateString()}
            </h3>
            {daysData[day].length > 0 ? (
              <ul className="text-white text-sm space-y-1 font-semibold">
                {daysData[day].map((game) => (
                  <li key={game.GameID}>
                    {game.AwayTeam} @ {game.HomeTeam} -{" "}
                    {new Date(game.DateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white text-sm">No games</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ScheduleDays;
