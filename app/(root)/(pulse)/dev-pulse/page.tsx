import { FC } from "react";
import Pulse from "@/components/card/Pulse";

import PulseForm from "@/components/form/PulseForm";
import { getAllPulses } from "@/lib/actions/pulse.action";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const data = await getAllPulses();
  return (
    <div className="size-full space-y-4 overflow-auto sm:rounded-lg sm:border">
      <PulseForm placeholder="Echo in DevPulse…" />
      {data.map((pulse) => (
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
          echoBack={pulse.reply_avatars || []}
        />
      ))}
    </div>
  );
};

export default Page;
