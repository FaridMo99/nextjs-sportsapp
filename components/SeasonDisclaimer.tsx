import { SeasonMessage } from '@/lib/getCurrentSeason';
import React from 'react'

type SeasonDisclaimerProps = {
  seasonType: SeasonMessage;
  season: number;
};

function SeasonDisclaimer({ seasonType, season }: SeasonDisclaimerProps) {

  if(seasonType === "last") return (
    <div className="w-full flex flex-col items-end my-2 text-sm pr-4">
      <p className="relative ">
        <span className="absolute -top-1 -left-2">*</span>
        {season} Season
          </p>
          <p>No Infos yet on {++season} Season</p>
    </div>
  );

  return null
}

export default SeasonDisclaimer