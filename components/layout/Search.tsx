"use client";
import React, { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Search as Loop } from "lucide-react";

type Cache = null | Record<string, unknown>;

function Search() {
  const [search, setSearch] = useState<string>("");
  const cacheRef = useRef<Cache>(null);
  const hasFetched = useRef<boolean>(false);

  async function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);

    if (!hasFetched.current && value.trim() !== "") {
      hasFetched.current = true;

      const res = await fetch("/api/route");
      const data = await res.json();
      cacheRef.current = data;
    }
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={submitHandler} className="relative w-2/5 md:w-1/2">
      <Input value={search} onChange={changeHandler} type="text" />
      {search.length > 0 && (
        <button
          type="submit"
          aria-label="search"
          className="absolute top-1.5 right-2"
        >
          <Loop />
        </button>
      )}
    </form>
  );
}

export default Search;
