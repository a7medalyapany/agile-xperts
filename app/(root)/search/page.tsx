"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/shared/Search/SearchBar";
import SearchResults from "@/components/shared/Search/SearchResullts";
// import FilterDropdown from "@/components/shared/Search/FilterDropdown";

const fetchSearchResults = async (query: string, filter: string) => {
  // insert fetching logic here
  return [
    { title: "Project 1", description: "Description 1", link: "#" },
    { title: "Project 2", description: "Description 2", link: "#" },
  ];
};

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState<
    {
      title: string;
      description: string;
      link: string;
    }[]
  >([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setTerm(query);
  }, [query]);

  const handleSearch = async (searchTerm: string) => {
    const data = await fetchSearchResults(searchTerm, filter);
    setResults(data);
  };

  return (
    <div className="p-4">
      <SearchBar
        term={term}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {/* <FilterDropdown filter={filter} setFilter={setFilter} handleSearch={handleSearch} /> */}
      <SearchResults results={results} />
    </div>
  );
};

export default SearchPage;
