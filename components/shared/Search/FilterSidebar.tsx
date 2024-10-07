"use client";
import React, { FC, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter } from "next/navigation";
import { categories } from "@/constants";

interface FilterSidebarProps extends React.HTMLAttributes<HTMLElement> {}

const SearchFilter: FC<FilterSidebarProps> = ({ className, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  const handleTypeChange = (type: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (selectedType === type) {
      setSelectedType(null);
      searchParams.delete("type");
    } else {
      setSelectedType(type);
      searchParams.set("type", type);
    }

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  const handleFilterChange = (category: string, filter: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const updatedFilters = { ...selectedFilters };

    // Toggle the filter selection for the specific category
    if (!updatedFilters[category]) {
      updatedFilters[category] = [];
    }

    if (updatedFilters[category].includes(filter)) {
      updatedFilters[category] = updatedFilters[category].filter(
        (f) => f !== filter
      ); // Remove the filter
    } else {
      updatedFilters[category].push(filter); // Add the filter
    }

    // Update the category query parameter (e.g., framework=next,react)
    if (updatedFilters[category].length > 0) {
      searchParams.set(category, updatedFilters[category].join("-"));
    } else {
      searchParams.delete(category); // If no filters, remove the category
    }

    setSelectedFilters(updatedFilters);
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  const getSelectedCount = (category: string) => {
    return selectedFilters[category]?.length || 0;
  };

  const isDefaultOrEmpty = selectedType === null; // Show constants if no type is selected

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
                type="checkbox"
                name="type"
                value="user"
                checked={selectedType === "user"}
                onChange={() => handleTypeChange("user")}
              />
              User
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="type"
                value="post"
                checked={selectedType === "post"}
                onChange={() => handleTypeChange("post")}
              />
              Post
            </div>
          </AccordionContent>
        </AccordionItem>

        {isDefaultOrEmpty &&
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
