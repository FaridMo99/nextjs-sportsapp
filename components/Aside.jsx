"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Aside({ links, limit, scrollColor }) {
  const path = usePathname();
  const [hovered, setHovered] = useState(false);

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
    <aside
      className={`fixed h-screen transition-colors duration-300 left-0 top-0 bg- ${hovered ? "w-1/4 md:w-1/6" : "w-1/6 md:w-1/10"} ${
        scrolled ? scrollColor : ""
      }`}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <nav className="w-full h-1/2 flex flex-col items-center justify-center mt-20">
        {links.map((link) => (
          <Link
            className={`hover:bg-orange-400 rounded-xl mt-4 w-[90%] h-1/10 flex items-center ${hovered ? "justify-between" : "justify-center"} px-4 ${path.endsWith(link.href) ? "text-black" : ""}`}
            key={link.href}
            href={link.href}
          >
            {link.icon}
            <p>{hovered && link.text}</p>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Aside;
