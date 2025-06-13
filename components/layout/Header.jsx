"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Search from "./Search";
import Link from "next/link";

function Header({ limit, scrollColor }) {
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
      className={`w-full h-[10vh] sticky top-0 left-0 flex items-center justify-center transition-colors duration-300 z-100 ${
        scrolled ? scrollColor : ""
      }`}
    >
      <Link href="/" className="absolute -left-3 top-0 h-full w-40">
        <Image
          priority
          src="/hooptracker-logo.png"
          alt="hooptracker logo"
          fill={true}
          sizes={100}
        />
      </Link>
      <Search />
    </header>
  );
}

export default Header;
