"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

function GamesCarousel({ games, state }) {
  return (
    <Swiper
      modules={[Navigation, EffectFade, Autoplay]}
      navigation
      effect="fade"
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop
      speed={1500}
      fadeEffect={{ crossFade: true }}
      className="rounded-sm shadow-md h-[40vh] relative"
    >
      {state === "InProgress" && (
        <div className="absolute top-2 right-2 z-10 flex items-center justify-between w-14">
          <p>Live</p>
          <div className="rounded-full bg-red-600 w-4 h-4 shadow-md shadow-red-500 animate-pulse"></div>
        </div>
      )}
      {games.map((game, index) => (
        <SwiperSlide
          key={index}
          className="p-6 bg-secondary border-1 border-secondary-light text-secondary-dark rounded-sm"
        >
          <p className="text-lg">
            {game.AwayTeam} @ {game.HomeTeam}
          </p>
          <p className="text-sm text-gray-500">
            {state !== "InProgress" && game.DateTime.replace("T", " ")}
          </p>
          {state === "Finished" && (
            <p className="mt-2 font-semibold">
              Final Score: {game.AwayTeamScore} - {game.HomeTeamScore}
            </p>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GamesCarousel;

/*finished game object: 
{
    GameID: 12347,
    Status: "Final",
    DateTime: "2025-06-10T19:30:00",
    DateTimeUTC: "2025-06-10T23:30:00Z",
    AwayTeam: "BOS",
    HomeTeam: "MIA",
    AwayTeamScore: 102,
    HomeTeamScore: 105,
    IsClosed: true,
    NeutralVenue: false,
    Season: 2025,
    SeasonType: 1,
    GameEndDateTime: "2025-06-10T22:15:00",
},
 */

/*scheduled game object: {
  "GameID": 12345,
  "Status": "Scheduled",
  "DateTime": "2025-06-11T19:30:00",
  "DateTimeUTC": "2025-06-11T23:30:00Z",
  "AwayTeam": "TOR",
  "HomeTeam": "CLE",
  "AwayTeamScore": 0,
  "HomeTeamScore": 0,
  "IsClosed": false,
  "NeutralVenue": false,
  "Season": 2025,
  "SeasonType": 1
} */

/*live game object: {
  "GameID": 12346,
  "Status": "InProgress",
  "DateTime": "2025-06-11T19:30:00",
  "DateTimeUTC": "2025-06-11T23:30:00Z",
  "AwayTeam": "LAL",
  "HomeTeam": "GSW",
  "AwayTeamScore": 58,
  "HomeTeamScore": 61,
  "IsClosed": false,
  "NeutralVenue": false,
  "Season": 2025,
  "SeasonType": 1
}*/
