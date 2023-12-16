"use client";

import axios from "axios";
import { useState } from "react";
import { useSearch } from "../providers/SearchProvider/SearchProvider";

export default function SearchProduct({ onLinkClick }) {
  const [searchQuery, setSearchQuery] = useState("");

  const { setResult } = useSearch();

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await axios.get(`/api/search?query=${searchQuery}`);
    const productData = await response.data;

    setResult(productData);
    setSearchQuery("");
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search..."
          className="rounded-lg focus-visible:border-none text-black/60 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-8   text-main-purple absolute right-52 sm:right-40 top-5 cursor-pointer hover:text-main-pink"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
