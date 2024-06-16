import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserBookmarks } from "@/lib/actions/pulse.action";
import BookmarksPulse from "@/components/card/BookedMarkedPulse";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const pulses = await getUserBookmarks();
  console.log(pulses);

  return (
    <div className="size-full space-y-4 overflow-auto sm:rounded-lg sm:border">
      {pulses.length === 0 && (
        <div className="my-20 flex h-full flex-col items-center justify-center gap-6 drop-shadow-lg">
          <Image
            src="/assets/images/agile-xperts.png"
            alt="empty"
            width={200}
            height={200}
            className="size-fit rounded-lg"
          />
          <Link
            className="rounded-lg bg-foreground px-4 py-2 text-background"
            href={"/dev-pulse"}
          >
            Go save some!
          </Link>
          <h4>No bookmarks found</h4>
        </div>
      )}
      {pulses.map((pulse) => (
        <BookmarksPulse
          key={pulse.id}
          id={pulse.id}
          authorId={pulse.profile?.id!}
          authorName={pulse.profile?.name!}
          authorAvatar={pulse.profile?.avatar_url!}
          photo={pulse.post?.img_url}
          content={pulse.post?.content}
        />
      ))}
    </div>
  );
};

export default Page;
