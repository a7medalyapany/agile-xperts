import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="mt-4 space-y-6">
      <div className="space-y-4">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="h-fit space-y-2 rounded-lg border p-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-[55%] rounded-lg" />
            <Skeleton className="h-4 w-[65%] rounded-lg" />
            <Skeleton className="h-4 w-[48%] rounded-lg" />
          </div>
        ))}
      </div>
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
  );
}
