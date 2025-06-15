import React from "react";
import ScheduleWeeks from "./ScheduleWeeks";
import formatSchedule from "@/lib/formatSchedule";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function ScheduleAccordion({ schedule }) {
  const formattedSchedule = formatSchedule(schedule);
  return (
    <Accordion type="multiple" className="w-full">
      {Object.entries(formattedSchedule).map(([monthName, weeksData]) => (
        <div
          key={monthName}
          className="rounded-sm border-secondary-light shadow-md bg-secondary border my-4"
        >
          <AccordionItem className="px-4" value={monthName}>
            <AccordionTrigger className="text-xl font-bold text-white">
              {monthName}
            </AccordionTrigger>
            <AccordionContent>
              <ScheduleWeeks weeksData={weeksData} />
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}

export default ScheduleAccordion;

//current day should be already open and highlighted
//each day should route to /schedule/[game]

const schedue = [
  {
    AlternateID: null,
    Attendance: 19842,
    AwayRotationNumber: 199,
    AwayTeam: "LAL",
    AwayTeamID: 27,
    AwayTeamMoneyLine: 64,
    AwayTeamScore: 42,
    Channel: "TNT",
    CrewChiefID: 20000054,
    DateTime: "2023-10-24T19:30:00",
    DateTimeUTC: "2023-10-24T23:30:00",
    Day: "2023-10-24T00:00:00",
    GameEndDateTime: "2023-10-24T21:54:39",
    GameID: 19593,
    GlobalAwayTeamID: 20000027,
    GlobalGameID: 20019593,
    GlobalHomeTeamID: 20000020,
    HomeRotationNumber: 199,
    HomeTeam: "DEN",
    HomeTeamID: 20,
    HomeTeamMoneyLine: -78,
    HomeTeamScore: 47,
    InseasonTournament: false,
    IsClosed: true,
    LastPlay: "Scrambled",
    NeutralVenue: false,
    OverPayout: -44,
    OverUnder: 91.1,
    PointSpread: -1.8,
    PointSpreadAwayTeamMoneyLine: -43,
    PointSpreadHomeTeamMoneyLine: -45,
    Quarter: null,
    Quarters: [],
    RefereeID: 20000030,
    Season: 2024,
    SeasonType: 1,
    SeriesInfo: null,
    StadiumID: 20,
    Status: "Final",
    TimeRemainingMinutes: null,
    TimeRemainingSeconds: null,
    UmpireID: 20000048,
    UnderPayout: -43,
    Updated: "2024-01-30T04:01:14",
  },
  {
    AlternateID: null,
    Attendance: 18064,
    AwayRotationNumber: 200,
    AwayTeam: "PHO",
    AwayTeamID: 29,
    AwayTeamMoneyLine: 49,
    AwayTeamScore: 43,
    Channel: "TNT",
    CrewChiefID: 20000053,
    DateTime: "2023-10-24T22:00:00",
    DateTimeUTC: "2023-10-25T02:00:00",
    Day: "2023-10-24T00:00:00",
    GameEndDateTime: "2023-10-25T00:44:22",
    GameID: 19594,
    GlobalAwayTeamID: 20000029,
    GlobalGameID: 20019594,
    GlobalHomeTeamID: 20000026,
    HomeRotationNumber: 200,
    HomeTeam: "GS",
    HomeTeamID: 26,
    HomeTeamMoneyLine: -59,
    HomeTeamScore: 41,
    InseasonTournament: false,
    IsClosed: true,
    LastPlay: "Scrambled",
    NeutralVenue: false,
    OverPayout: -44,
    OverUnder: 93.3,
    PointSpread: -1.2,
    PointSpreadAwayTeamMoneyLine: -43,
    PointSpreadHomeTeamMoneyLine: -45,
    Quarter: null,
    Quarters: [],
    RefereeID: 20000067,
    Season: 2024,
    SeasonType: 1,
    SeriesInfo: null,
    StadiumID: 51,
    Status: "Final",
    TimeRemainingMinutes: null,
    TimeRemainingSeconds: null,
    UmpireID: 20000049,
    UnderPayout: -44,
    Updated: "2024-01-30T04:01:14",
  },
];
