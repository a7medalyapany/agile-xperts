import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="size-full space-y-2 rounded-lg border p-4 md:w-2/5">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="w-full space-y-2 rounded-lg border p-4">
          <div className="flex gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-40" />
        </div>
      </div>

      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}
