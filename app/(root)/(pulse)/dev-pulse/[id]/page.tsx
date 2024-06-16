import { FC } from "react";
import { IPulseReply, URLProps } from "@/types";
import PulseForm from "@/components/form/PulseForm";
import Pulse from "@/components/card/Pulse";
import { getPulseById } from "@/lib/actions/pulse.action";

const page: FC<URLProps> = async ({ params }: URLProps) => {
  const { pulse, replies } = await getPulseById({ id: params.id });

  return (
    <div className="size-full overflow-auto sm:rounded-lg sm:border">
      {pulse && (
        <>
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
            hasLiked={pulse.has_liked!}
            hasReposted={pulse.has_reposted!}
            hasBookmarked={pulse.has_bookmarked!}
          />
          <PulseForm
            parentPostId={parseInt(params.id)}
            placeholder="EchoBack on DevPulse…"
          />
        </>
      )}
      {replies?.map((echoBack: IPulseReply) => (
        <Pulse
          key={echoBack.replyId!}
          id={echoBack.replyId!}
          content={echoBack.content}
          photo={echoBack.photo}
          createdAt={echoBack.createdAt!}
          updatedAt={echoBack.updatedAt!}
          authorId={echoBack.authorId!}
          authorName={echoBack.authorName!}
          authorUsername={echoBack.authorUsername!}
          authorAvatar={echoBack.authorAvatar!}
          isEchoBack={true}
          echoBack={[]}
          likeCount={0}
          replyCount={0}
          repostCount={0}
          hasLiked={false}
          hasReposted={false}
          hasBookmarked={false}
        />
      ))}
    </div>
  );
};

export default page;
