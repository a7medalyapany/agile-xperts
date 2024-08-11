import { Separator } from "@/components/ui/separator";

export function Trending() {
  return (
    <div className="rounded-lg border shadow-md">
      <h2 className="border-b px-4 py-3 text-lg font-semibold">Most Viral</h2>
      {[1, 2].map((value) => (
        <div key={value}>
          <div className="flex items-start justify-between gap-4 p-4 hover:bg-muted/50">
            <strong className="text-base font-medium">Next.Js</strong>
            <p className="text-sm text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error,
              unde.
            </p>
          </div>
          {value < 2 && <Separator />}
        </div>
      ))}
    </div>
  );
}
