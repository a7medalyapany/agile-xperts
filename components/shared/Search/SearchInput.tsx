"use client";
import React, { FC, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import UserResults from "./Results/UserResults";
import PostResults from "./Results/PostResults";
import ProjectResults from "./Results/ProjectResults";

interface SearchBarProps {}

const Search: FC<SearchBarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch search query and type from URL
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "project"; // Default to 'project' if type is missing or undefined

  const [search, setSearch] = useState<string>(query);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else if (query) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q", "type"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, query, searchParams, router, pathname]);

  const renderResults = () => {
    switch (type) {
      case "user":
        return <UserResults />;
      case "post":
        return <PostResults />;
      case "project":
      default:
        return <ProjectResults />;
    }
  };

  return (
    <>
      <div className="mb-8 flex w-full max-w-2xl items-center">
        <div className="relative w-full">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full focus:outline-none"
            placeholder="Search for users, projects, or posts..."
          />
          <SearchIcon
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      {renderResults()}
    </>
  );
};

export default Search;
