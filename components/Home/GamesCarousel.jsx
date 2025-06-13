"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import LiveTag from "../LiveTag";

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
      {state === "InProgress" && <LiveTag />}
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
