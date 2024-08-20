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

  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "project";

  const [search, setSearch] = useState<string>(query);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          updates: { q: search },
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
        return <UserResults query={query} />;
      case "post":
        return <PostResults query={query} />;
      case "project":
      default:
        return <ProjectResults query={query} />;
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
