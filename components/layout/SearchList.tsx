import { SearchResponse } from "@/app/api/route";
import { Loader2 } from "lucide-react";
import React from "react";
import SearchItemCard from "./SearchItemCard";
import { PlayerInfo, Team } from "@/app/types";

export type SearchListProps = {
  data: SearchResponse | undefined;
  isError: boolean;
  isLoading: boolean;
  search: string;
  scrolled: boolean;
};

export type SearchResult =
  | { type: "player"; item: PlayerInfo }
  | { type: "team"; item: Team };

export function sortAndFilterList(
  search: string,
  data: SearchResponse,
): SearchResult[] {
  const query = search.toLowerCase();

  const players = data.players
    .filter(
      (player) =>
        player.FirstName.toLowerCase().includes(query) ||
        player.LastName.toLowerCase().includes(query),
    )
    .map((player) => ({ type: "player" as const, item: player }));

  const teams = data.teams
    .filter(
      (team) =>
        team.Name.toLowerCase().includes(query) ||
        team.City.toLowerCase().includes(query),
    )
    .map((team) => ({ type: "team" as const, item: team }));

  const combined = [...players, ...teams];

  return combined.sort((a, b) => {
    const queryLower = search.toLowerCase();

    const getLabel = (entry: SearchResult) => {
      if (entry.type === "player") {
        return `${entry.item.FirstName} ${entry.item.LastName}`.toLowerCase();
      } else {
        return `${entry.item.City} ${entry.item.Name}`.toLowerCase();
      }
    };

    const labelA = getLabel(a);
    const labelB = getLabel(b);

    const aStartsWith = labelA.startsWith(queryLower);
    const bStartsWith = labelB.startsWith(queryLower);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;

    return labelA.localeCompare(labelB);
  });
}

function SearchList({
  data,
  isError,
  isLoading,
  search,
  scrolled,
}: SearchListProps) {
  const results: SearchResult[] = data ? sortAndFilterList(search, data) : [];

  return (
    <div
      className={`absolute top-full left-0 w-full max-h-60 overflow-y-auto  z-50 rounded-b-md border border-t-0 transition-colors duration-300 ${scrolled ? "bg-secondary border-secondary-light" : "bg-primary"}`}
    >
      {" "}
      {(isError || results.length === 0) && (
        <p className="flex justify-center items-center">
          Oops, something went wrong...
        </p>
      )}
      {isLoading && <Loader2 className="animate-spin" />}
      {data &&
        results.map((result) => {
          let key;
          if (result.type === "team") key = result.item.TeamID;
          if (result.type === "player") key = result.item.PlayerID;
          return (
            <SearchItemCard key={key} item={result.item} type={result.type} />
          );
        })}
    </div>
  );
}

export default SearchList;
