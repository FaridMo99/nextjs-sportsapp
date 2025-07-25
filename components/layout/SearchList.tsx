import React from "react";
import { Loader2 } from "lucide-react";
import { SearchResponse } from "@/app/api/route";
import { SearchResult, sortAndFilterList } from "@/lib/sortAndFilterSearch";
import SearchItemCard from "./SearchItemCard";

export type SearchListProps = {
  data: SearchResponse | undefined;
  isError: boolean;
  isLoading: boolean;
  search: string;
  scrolled: boolean;
};

function SearchList({
  data,
  isError,
  isLoading,
  search,
  scrolled,
}: SearchListProps) {

  const results: SearchResult[] =  data ? sortAndFilterList(search, data) : [];


  return (
    <div
      className={`absolute top-full left-0 w-full max-h-60 overflow-y-auto z-50 rounded-b-md border border-t-0 transition-colors duration-300 ${
        scrolled ? "bg-secondary border-secondary-light" : "bg-primary"
      }`}
    >
      {(isError || (results.length === 0 && data)) && (
        <p className="flex justify-center items-center w-full h-full my-4">
          Oops, something went wrong...
        </p>
      )}
      {isLoading && (
        <div className="flex justify-center items-center w-full h-full my-4">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {data &&
        results.map((result) => {
          const key =
            result.type === "team" ? result.item.TeamID : result.item.PlayerID;

          return (
            <SearchItemCard
              key={key}
              item={result.item}
              type={result.type}
              season={data.season.season}
            />
          );
        })}
    </div>
  );
}

export default SearchList;
