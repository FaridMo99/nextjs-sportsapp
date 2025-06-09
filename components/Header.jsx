"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Search from "./Search";

function Header() {
  const limit = 50;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > limit) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [limit]);

  return (
    <header
      className={`w-full h-[10vh] fixed flex items-center justify-center transition-all duration-300 z-100 ${
        scrolled ? "bg-black/30" : ""
      }`}
    >
      <div className="absolute left-0 top-0 h-full w-[25%]">
        <Image src="/hooptracker-logo.png" alt="hooptracker logo" fill={true} />
      </div>
      <Search />
    </header>
  );
}

export default Header;
