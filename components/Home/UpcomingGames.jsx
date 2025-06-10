"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

function UpcomingGames({ content }) {
  return (
    <Swiper>{/*{content.map(game=> <SwiperSlide></SwiperSlide>)}*/}</Swiper>
  );
}

export default UpcomingGames;
