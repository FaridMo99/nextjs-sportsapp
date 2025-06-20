"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Aside({ links }) {
  const path = usePathname();
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      className={`sticky h-[90vh] flex flex-col justify-center left-0 top-[10vh] z-100 ${hovered ? "min-w-1/4 md:min-w-1/6" : "min-w-1/6 md:min-w-1/10"}`}
    >
      <nav
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        className="w-full outline-1 mb-[10vh] outline-secondary-light h-1/2 bg-secondary rounded-r-xl flex flex-col items-center justify-center"
      >
        {links.map((link) => (
          <Link
            className={`hover:bg-secondary-light transition-colors duration-400 py-6 rounded-md mt-4 w-[90%] h-1/10 flex items-center ${hovered ? "justify-between" : "justify-center"} px-4 ${
              (link.href === "/" ? path === "/" : path.startsWith(link.href))
                ? "text-white bg-secondary-light brightness-115"
                : "text-gray-400"
            }`}
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
