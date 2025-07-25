"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search as Loop } from "lucide-react";
import SearchList from "./SearchList";
import { SearchResponse } from "@/app/api/route";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

async function getSearch(): Promise<SearchResponse> {
  const res = await fetch("/api");

  if (!res.ok) {
    throw new Error();
  }

  return res.json();
}

function Search({ scrolled }: { scrolled: boolean }) {
  const [search, setSearch] = useState<string>("");
  const [firstLink,setFirstLink] = useState<string>("")
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["Search"],
    queryFn: getSearch,
    enabled: search.length > 0,
    staleTime: Infinity,
  });

  async function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value.replace(/^\s/, ""));
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    redirect(firstLink)
  }

  return (
    <div className="w-2/5 md:w-1/2 relative">
      <form onSubmit={submitHandler} className="w-full h-full">
        <Input
          value={search}
          onChange={changeHandler}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
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
          data={data}
          isError={isError}
          search={search}
          isLoading={isLoading}
          scrolled={scrolled}
        />
      )}
    </div>
  );
}

export default Search;
//API doesnt support filtering and sorting so i have to fetch all data and do
//this client side
