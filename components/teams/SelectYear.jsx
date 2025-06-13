"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectYear({ currentSeason }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSeason = searchParams.get("season") || currentSeason;

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("season", value);
    router.replace(`?${params.toString()}`);
  };

  const seasons = [];
  for (let year = Number(currentSeason); year >= 2000; year--) {
    seasons.push(String(year));
  }

  return (
    <div className="w-full flex items-center justify-end">
      <Select value={selectedSeason} onValueChange={handleChange}>
        <SelectTrigger className="w-[100px] bg-secondary border-secondary-light font-bold">
          <SelectValue placeholder="Select Season" />
        </SelectTrigger>
        <SelectContent className="max-h-[150px] overflow-auto bg-secondary text-white border-secondary-light">
          <SelectGroup>
            <SelectLabel>Season:</SelectLabel>
            {seasons.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectYear;
