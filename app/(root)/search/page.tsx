"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { SearchFilters } from "@/constants";
import { Button } from "@/components/ui/button";
import FollowButton from "@/components/shared/FollowButton";

// SearchPage Component
const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  // Example mock data
  const searchResults: SearchResult[] = [
    {
      id: 1,
      albumArt: "/path/to/image1.jpg",
      artist: "Artist 1",
      title: "Song 1",
      genre: ["Pop"],
      mood: ["Happy"],
      popularity: 90,
    },
    {
      id: 2,
      albumArt: "/path/to/image2.jpg",
      artist: "Artist 2",
      title: "Song 2",
      genre: ["Rock"],
      mood: ["Sad"],
      popularity: 80,
    },
    {
      id: 3,
      albumArt: "/path/to/image3.jpg",
      artist: "Artist 3",
      title: "Song 3",
      genre: ["Jazz"],
      mood: ["Chill"],
      popularity: 70,
    },
    {
      id: 4,
      albumArt: "/path/to/image4.jpg",
      artist: "Artist 4",
      title: "Song 4",
      genre: ["Rap"],
      mood: ["Angry"],
      popularity: 60,
    },
    {
      id: 5,
      albumArt: "/path/to/image5.jpg",
      artist: "Artist 5",
      title: "Song 5",
      genre: ["Country"],
      mood: ["Happy"],
      popularity: 50,
    },
    {
      id: 11,
      albumArt: "/path/to/image1.jpg",
      artist: "Artist 1",
      title: "Song 1",
      genre: ["Pop"],
      mood: ["Happy"],
      popularity: 90,
    },
    {
      id: 12,
      albumArt: "/path/to/image2.jpg",
      artist: "Artist 2",
      title: "Song 2",
      genre: ["Rock"],
      mood: ["Sad"],
      popularity: 80,
    },
    {
      id: 13,
      albumArt: "/path/to/image3.jpg",
      artist: "Artist 3",
      title: "Song 3",
      genre: ["Jazz"],
      mood: ["Chill"],
      popularity: 70,
    },
    {
      id: 14,
      albumArt: "/path/to/image4.jpg",
      artist: "Artist 4",
      title: "Song 4",
      genre: ["Rap"],
      mood: ["Angry"],
      popularity: 60,
    },
    {
      id: 15,
      albumArt: "/path/to/image5.jpg",
      artist: "Artist 5",
      title: "Song 5",
      genre: ["Country"],
      mood: ["Happy"],
      popularity: 50,
    },
    {
      id: 111,
      albumArt: "/path/to/image1.jpg",
      artist: "Artist 1",
      title: "Song 1",
      genre: ["Pop"],
      mood: ["Happy"],
      popularity: 90,
    },
    {
      id: 112,
      albumArt: "/path/to/image2.jpg",
      artist: "Artist 2",
      title: "Song 2",
      genre: ["Rock"],
      mood: ["Sad"],
      popularity: 80,
    },
    {
      id: 113,
      albumArt: "/path/to/image3.jpg",
      artist: "Artist 3",
      title: "Song 3",
      genre: ["Jazz"],
      mood: ["Chill"],
      popularity: 70,
    },
    {
      id: 114,
      albumArt: "/path/to/image4.jpg",
      artist: "Artist 4",
      title: "Song 4",
      genre: ["Rap"],
      mood: ["Angry"],
      popularity: 60,
    },
    {
      id: 115,
      albumArt: "/path/to/image5.jpg",
      artist: "Artist 5",
      title: "Song 5",
      genre: ["Country"],
      mood: ["Happy"],
      popularity: 50,
    },
    // Add more mock data as needed
  ];

  // Handle search logic
  useEffect(() => {
    // Simple search logic - adjust as needed
    const results = searchResults.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
  }, [searchTerm]);

  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <div className="mb-8 flex w-full max-w-2xl items-center">
        <div className="relative w-full">
          <Input
            className="w-full rounded-full focus:outline-none"
            placeholder="Search for users, projects, more..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="flex cursor-pointer flex-col items-center rounded-lg border p-4 drop-shadow-lg transition-transform duration-200 hover:scale-105"
          >
            <Image
              src={"https://avatars.githubusercontent.com/u/103336732?v=4"}
              alt={${result.artist} - ${result.title}}
              width={100}
              height={100}
              className="rounded-full"
            />
            <p className="mt-4 font-semibold">{result.artist}</p>
            <p className="text-sm text-muted-foreground">{result.title}</p>
            <FollowButton
              Following={false}
              userId={""}
              targetUserId={""}
              className="mt-2 h-fit min-w-[100px] rounded-full px-3 py-1.5 text-sm font-medium"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;