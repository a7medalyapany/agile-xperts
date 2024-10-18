import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 md:h-[80vh] md:flex-row">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Ignite Your Genius Section */}
          <div className="w-full rounded-lg border p-6 shadow md:w-1/2">
            <Skeleton className="mb-4 h-8 w-48" />
            <Skeleton className="mb-6 h-4 w-full max-w-md" />
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Pro Card */}
          <div className="w-full rounded-lg border p-6 shadow md:w-1/2">
            <Skeleton className="mb-4 h-6 w-24" />
            <Skeleton className="mb-2 h-10 w-20 justify-center" />
            <Skeleton className="h-4 w-full max-w-xs" />
            <Skeleton className="mt-2 h-4 w-full max-w-xs" />
          </div>
        </div>

        {/* Projects Table */}
        <div className="hidden h-fit rounded-lg border p-6 shadow md:block">
          <Skeleton className="mb-6 h-8 w-32" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex grow flex-col items-center justify-around gap-2 md:flex-row"
              >
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-28" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="h-fit w-full space-y-6 rounded-lg border p-4 md:w-80">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-8 w-full" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </div>
        <Skeleton className="h-8 w-full" />
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="size-10 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
