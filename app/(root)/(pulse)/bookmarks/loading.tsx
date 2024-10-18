import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="w-full space-y-6">
          {/* Feed */}
          {[...Array(10)].map((_, index) => (
            <div key={index} className="space-y-4 rounded-md border p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <Skeleton className="h-6 w-32 rounded-md" />
              </div>
              <Skeleton className="h-6 w-full rounded-md" />
              <div className="flex gap-4">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="size-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
