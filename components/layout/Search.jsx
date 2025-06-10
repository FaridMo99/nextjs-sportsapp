"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search as Loop } from "lucide-react";

function Search() {
  const [search, setSearch] = useState("");

  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={submitHandler} className="relative w-2/5 md:w-1/2">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
      />
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
