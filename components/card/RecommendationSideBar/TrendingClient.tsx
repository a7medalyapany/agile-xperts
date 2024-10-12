"use client";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface TrendingTopic {
  title: string;
  url: string;
  engagementScore?: number;
  hook: string;
}

interface TrendingClientProps {
  topics: TrendingTopic[];
}

export function TrendingClient({ topics }: TrendingClientProps) {
  return (
    <div className="rounded-lg border shadow-md">
      <h2 className="border-b px-4 py-3 text-lg font-semibold">Most Viral</h2>
      {topics.map((topic, idx) => (
        <div key={idx}>
          <Link
            href={topic.url}
            target="_blank"
            className="flex flex-col items-start justify-between gap-4 p-4 text-center hover:bg-muted/50"
          >
            <strong className="text-base font-medium">{topic.title}</strong>
            <p className="text-sm text-gray-500">{topic.hook}</p>
          </Link>
          {idx < topics.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}

export default TrendingClient;
