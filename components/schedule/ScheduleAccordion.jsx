import React from "react";
import ScheduleMonths from "./ScheduleMonths";
import ScheduleWeeks from "./ScheduleWeeks";
import ScheduleDays from "./ScheduleDays";
//import "server-only"

function ScheduleAccordion({ schedule }) {
  return (
    <ScheduleMonths>
      <ScheduleWeeks />
    </ScheduleMonths>
  );
}

export default ScheduleAccordion;

//structure
//accordion with months than weeks than days,
// current day should be already open and highlighted
//each day should route to /schedule/[game]
