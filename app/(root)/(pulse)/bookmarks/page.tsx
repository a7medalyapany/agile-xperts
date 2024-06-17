import { FC } from "react";
import { getUserBookmarks } from "@/lib/actions/pulse.action";
import BookmarksPulse from "@/components/card/BookedMarkedPulse";
import NoResults from "@/components/shared/NoResults";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const pulses = await getUserBookmarks();

  return (
    <div className="size-full space-y-4 overflow-auto sm:rounded-lg sm:border">
      {pulses.length === 0 ? (
        <NoResults
          linkText="Go save some!"
          link="/dev-pulse"
          text="No bookmarks found"
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Page;
