import { Separator } from "@/components/ui/separator";

export function Trending() {
  return (
    <div className="rounded-t-lg border">
      <h2 className="my-6 text-xl">Most viral</h2>
      {[1, 2].map((value) => {
        return (
          <>
            <div
              key={value}
              className="flex items-start justify-between gap-4 p-4 text-start hover:bg-muted"
            >
              <strong className="font-bold">Next.Js</strong>
              <p className="text-sm text-muted-foreground">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error,
                unde.
              </p>
            </div>
            <Separator />
          </>
        );
      })}
    </div>
  );
}
