import { FC } from "react";
import { URLProps } from "@/types";
import Pulse from "@/components/card/Pulse";
import NoResults from "@/components/shared/NoResults";
import { getUserPulses } from "@/lib/actions/pulse.action";

interface pageProps extends URLProps {}

const Page: FC<pageProps> = async ({ params }) => {
  const pulses = await getUserPulses(params.id);

  return (
    <>
      {pulses.length === 0 ? (
        <NoResults
          linkText="Get Pulsed"
          link="/dev-pulse"
          text="No pulses found"
          currentId={params.id}
        />
      ) : (
        <div className="space-y-4">
          {pulses.map((pulse) => (
            <Pulse
              key={pulse.post_id!}
              id={pulse.post_id!}
              content={pulse.content}
              photo={pulse.img_url}
              createdAt={pulse.created_at!}
              updatedAt={pulse.updated_at!}
              authorId={pulse.author_id!}
              authorName={pulse.author_name!}
              authorUsername={pulse.author_username!}
              authorAvatar={pulse.author_avatar_url!}
              likeCount={pulse.like_count!}
              replyCount={pulse.reply_count!}
              repostCount={pulse.repost_count!}
              isEchoBack={false}
              echoBack={[]}
              hasLiked={pulse.has_liked!}
              hasReposted={pulse.has_reposted!}
              hasBookmarked={pulse.has_bookmarked!}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Page;
