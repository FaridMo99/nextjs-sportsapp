"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import LiveTag from "../LiveTag";
import { GameScore } from "@/app/types";

type GamesCarouselProps = {
  games: GameScore[];
  state: string;
};

function GamesCarousel({ games, state }: GamesCarouselProps) {
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
      className="rounded-sm shadow-md h-[15vh] relative"
    >
      {state === "InProgress" && <LiveTag />}
      {games.map((game, index) => (
        <SwiperSlide
          key={index}
          className="p-6 bg-secondary border-1 border-secondary-light text-secondary-dark rounded-sm"
        >
          <p className="text-lg">
            <Link
              className="hover:underline"
              href={`/schedule/${game.Season}/${game.GameID}`}
            >
              {game.AwayTeam} @ {game.HomeTeam}
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            {state !== "InProgress" &&
              game.DateTime.replace("T", " ").slice(0, 16)}
          </p>
          {state === "Final" && (
            <p className="mt-2 font-semibold absolute top-2 right-4">
              {game.AwayTeam} {game.AwayTeamScore} <br /> {game.HomeTeam}{" "}
              {game.HomeTeamScore}
            </p>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GamesCarousel;
