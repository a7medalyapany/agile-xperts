import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left sidebar (hidden on mobile) */}
          <div className="hidden w-64 space-y-4 md:block">
            {[
              "Search Type",
              "Framework",
              "Language",
              "Database",
              "CSS",
              "Authentication",
              "Usecase",
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item}</span>
                  {index !== 0 && <ChevronDown className="size-4" />}
                </div>
                {index === 1 && <Skeleton className="h-5 w-8 rounded-full" />}
                {index === 2 && <Skeleton className="h-5 w-8 rounded-full" />}
                {index === 4 && (
                  <>
                    <Skeleton className="h-8 w-full rounded-md" />
                    <Skeleton className="h-8 w-full rounded-md" />
                    <Skeleton className="h-8 w-full rounded-md" />
                    <Skeleton className="h-8 w-full rounded-md" />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="w-full px-2 md:px-10">
            {/* Search bar */}
            <div className="mb-6 flex justify-center">
              <Skeleton className="h-10 w-[90%] rounded-md md:w-[70%]" />
            </div>

            {/* Cards (1 column on mobile, 2 on larger screens) */}
            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-4 rounded-lg border p-4">
                  <Skeleton className="h-40 w-full rounded-md" />
                  <Skeleton className="h-6 w-1/2" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
