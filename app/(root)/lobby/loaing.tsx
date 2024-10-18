import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(21)].map((_, index) => (
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
  );
}
