"use client";
import React, { FC, useState, useEffect } from "react";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/constants";

const projectFilters = [
  "usecase",
  "framework",
  "language",
  "database",
  "css",
  "authentication",
];

interface FilterSidebarProps extends React.HTMLAttributes<HTMLElement> {}

const SearchFilter: FC<FilterSidebarProps> = ({ className, ...props }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "project";

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [searchType, setSearchType] = useState(currentType);

  useEffect(() => {
    if (searchType === "project") {
      const updates = {
        type: searchType,
        ...Object.keys(selectedFilters).reduce(
          (acc, category) => {
            if (selectedFilters[category]?.length) {
              acc[category] = selectedFilters[category].join("-");
            }
            return acc;
          },
          {} as Record<string, string>
        ),
      };
      const newUrl = formUrlQuery({ params: searchParams.toString(), updates });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [...projectFilters, "type"], // Remove project filters + change the type
      });

      const updatedUrl = formUrlQuery({
        params: newUrl,
        updates: { type: searchType }, // Add the new search type to the URL
      });

      router.push(updatedUrl, { scroll: false });
    }
  }, [selectedFilters, searchType]);

  const handleFilterChange = (category: string, item: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      const isAlreadySelected = updatedFilters[category]?.includes(item);

      if (isAlreadySelected) {
        updatedFilters[category] = updatedFilters[category].filter(
          (i) => i !== item
        );
      } else {
        updatedFilters[category] = [...(updatedFilters[category] || []), item];
      }

      if (updatedFilters[category]?.length === 0) {
        delete updatedFilters[category];
      }

      return updatedFilters;
    });
  };

  const handleTypeChange = (type: string) => {
    setSearchType(type);
  };

  const getSelectedCount = (category: string) => {
    return selectedFilters[category]?.length || 0;
  };

  return (
    <aside
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="type">
          <AccordionTrigger>Search Type</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="type"
                value="project"
                checked={searchType === "project"}
                onChange={() => handleTypeChange("project")}
              />
              Project
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="type"
                value="user"
                checked={searchType === "user"}
                onChange={() => handleTypeChange("user")}
              />
              User
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="type"
                value="post"
                checked={searchType === "post"}
                onChange={() => handleTypeChange("post")}
              />
              Post
            </div>
          </AccordionContent>
        </AccordionItem>

        {searchType === "project" &&
          Object.entries(categories).map(([category, items]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="flex flex-row-reverse items-center justify-end gap-4">
                {getSelectedCount(category) > 0 && (
                  <span className="ml-auto inline-flex size-6 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-800">
                    {getSelectedCount(category)}
                  </span>
                )}
                <span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item}
                    className="flex w-full items-center gap-3 rounded-lg bg-muted p-2"
                  >
                    <Checkbox
                      checked={
                        selectedFilters[category]?.includes(item) || false
                      }
                      onCheckedChange={() => handleFilterChange(category, item)}
                    />
                    {item}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </aside>
  );
};

export default SearchFilter;
