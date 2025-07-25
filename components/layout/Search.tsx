"use client";

import React, { useMemo, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Search as Loop } from "lucide-react";
import SearchList from "./SearchList";
import { SearchResponse } from "@/app/api/route";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SearchResult, sortAndFilterList } from "@/lib/sortAndFilterSearch";



async function getSearch(): Promise<SearchResponse> {
  const res = await fetch("/api");

  if (!res.ok) {
    throw new Error();
  }

  return res.json();
}

function Search({ scrolled }: { scrolled: boolean }) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function debounceFocus(boolean:boolean,ms:number):void {
    setTimeout(() => {
      setIsFocused(boolean)
    },ms);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Search"],
    queryFn: getSearch,
    enabled: search.length > 0,
    staleTime: Infinity,
  });

  const results: SearchResult[] = useMemo(() => {
    return data ? sortAndFilterList(search, data) : [];
  }, [search, data]);

  function handleFocusCapture() {
    setIsFocused(true);
  }

function handleFocusBlur(e: React.FocusEvent<HTMLDivElement>) {
  const target = e.relatedTarget as HTMLElement | null;
  if (
    focusRef.current &&
    target &&
    focusRef.current.contains(target)
  ) {
    return;
  }
    debounceFocus(false, 150);
}

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value.replace(/^\s/, "");
    setSearch(newVal);
    setIsFocused(true);
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const top = results[0];
    if (!top || !search) return;

    if (top.type === "player") {
      router.push(`/players/${top.item.PlayerID}`);
    } else {
      router.push(`/teams/${top.item.TeamID}/${data?.season.season}`);
    }

    debounceFocus(false,150);
    setSearch("");
    inputRef.current?.blur();
  }

  return (
    <div
      ref={focusRef}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleFocusBlur}
      className="w-2/5 md:w-1/2 relative"
    >
      <form onSubmit={submitHandler} className="w-full h-full">
        <Input
          value={search}
          ref={inputRef}
          onChange={changeHandler}
          type="text"
          className={`${search.length > 0 && isFocused ? "rounded-b-none" : ""}`}
        />
        {search.length > 0 && data && (
          <button
            type="submit"
            aria-label="search"
            className="absolute top-1.5 right-2"
          >
            <Loop />
          </button>
        )}
      </form>

      {search.length > 0 && isFocused && (
        <SearchList
          results={results}
          isError={isError}
          search={search}
          isLoading={isLoading}
          scrolled={scrolled}
          season={data?.season.season}
        />
      )}
    </div>
  );
}

export default Search;
//API doesnt support filtering and sorting so i have to fetch all data and do
//this client side
