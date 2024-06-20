import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserYouMayKnow() {
  return (
    <div className="rounded-t-lg border">
      <h2 className="my-6 text-xl">People You May Know</h2>
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <>
            <Link
              key={value}
              href={`/profile/${"#"}`}
              className="flex items-center justify-between p-4 hover:bg-muted "
            >
              <div className="flex gap-1">
                <Avatar className="shrink-0 drop-shadow-lg">
                  <AvatarImage src={"#"} />
                  <AvatarFallback>cn</AvatarFallback>
                </Avatar>
                <div className="text-start">
                  <p className="font-bold">Ahmed Ibrahim</p>
                  <p className="text-sm text-muted-foreground">@username</p>
                </div>
              </div>
              <button>follow</button>
            </Link>
            <Separator />
          </>
        );
      })}
    </div>
  );
}
