"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectYearProps = {
  currentSeason: number;
  chosenSeason: string;
  path: string;
  nestedPath?: string;
};

function SelectYear({
  currentSeason,
  chosenSeason,
  path,
  nestedPath = "",
}: SelectYearProps) {
  const router = useRouter();
  const limit: number = currentSeason - 1;

  const seasons = [];
  for (let year = currentSeason; year >= limit; year--) {
    seasons.push(String(year));
  }

  function handleChange(newSeason: string) {
    if (nestedPath !== "") {
      router.push(`/${path}/${nestedPath}/${newSeason}`);
    } else {
      router.push(`/${path}/${newSeason}`);
    }
  }

  return (
    <div className="w-full flex items-center justify-end">
      <Select value={chosenSeason} onValueChange={handleChange}>
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
//usually this was meant to go until 1950 but the api free tier doesnt offer that far back
//the component got commented out since the free tier doesnt offer past seasons, functionality wise
//the component works
