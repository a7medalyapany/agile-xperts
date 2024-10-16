import React from "react";
import TrendingClient from "./TrendingClient";

interface TrendingTopic {
  title: string;
  url: string;
  hook: string;
  engagementScore?: number;
}

async function getTrendingTopics(): Promise<TrendingTopic[]> {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const fullUrl = `${apiUrl}/api/trendingTech`;
  try {
    const res = await fetch(fullUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error("Response not OK:", res.status, res.statusText);
      throw new Error(
        `Failed to fetch trending topics: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    throw error;
  }
}

export async function Trending() {
  const topics = await getTrendingTopics();
  return <TrendingClient topics={topics} />;
}

export default Trending;
