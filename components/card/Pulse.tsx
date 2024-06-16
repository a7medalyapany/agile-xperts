"use client";
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IPulseProps } from "@/types";
import Metric from "../shared/Metric";
import ReadMore from "../shared/ReadMore";
import {
  handlePulseBookMark,
  handlePulseLike,
} from "@/lib/actions/pulse.action";

interface PulseProps extends IPulseProps {
  isEchoBack?: boolean;
  echoBack: string[];
}

const Pulse: FC<PulseProps> = ({
  id,
  content,
  photo,
  authorId,
  authorName,
  authorAvatar,
  likeCount: initialLikeCount,
  replyCount,
  repostCount: initialRepostCount,
  isEchoBack,
  echoBack,
  hasLiked,
  hasReposted,
  hasBookmarked,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(hasBookmarked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [repostCount, setRepostCount] = useState(initialRepostCount);

  const handleLikeClick = async () => {
    const optimisticLikeCount = initialLikeCount + (hasLiked ? -1 : 1);
    setLikeCount(optimisticLikeCount);

    try {
      const result = await handlePulseLike({ postId: id });
      setLikeCount(result?.likeCount!);
    } catch (error) {
      console.error(error);
      setLikeCount(initialLikeCount);
    }
  };

  const handleRepostClick = () => {
    const optimisticRepostCount = initialRepostCount + (hasReposted ? -1 : 1);
    setRepostCount(optimisticRepostCount);

    // Simulate a server request here for repost action
    // Perform async action and update state if necessary
  };

  const handleBookmarkClick = async () => {
    setIsBookmarked(!isBookmarked);
    try {
      await handlePulseBookMark({ postId: id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article
      className={`flex w-full flex-col border-b p-0 sm:p-6 ${isEchoBack ? "py-6" : "pb-6"}`}
    >
      <div className="flex items-start">
        <div className="flex w-full flex-1 flex-row gap-2">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${authorId}`} className="relative size-11">
              <Avatar>
                <AvatarImage src={authorAvatar} alt="@userPhoto" />
                <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
          </div>

          <div className="flex w-full flex-col space-y-2">
            <Link href={`/profile/${authorId}`} className="w-fit">
              <h4 className="base-medium cursor-pointer font-bold">
                {authorName}
              </h4>
            </Link>
            <Link href={`/dev-pulse/${id}`} className="w-full">
              {content && (
                <ReadMore text={content} className="text-start text-sm" />
              )}
              {photo && (
                <Image
                  src={photo}
                  alt="pulse-photo"
                  width={1200}
                  height={400}
                  className="xs:h-[400px] h-64 w-full rounded-lg object-cover lg:h-[450px]"
                />
              )}
            </Link>
            <div
              className={`${isEchoBack && "mb-10"} mt-5 flex flex-col gap-3`}
            >
              <div
                className={`${isEchoBack ? "hidden" : "flex w-full items-center justify-between"}`}
              >
                <Metric
                  imgUrl={
                    hasLiked
                      ? "/assets/icons/echo-filled.svg"
                      : "/assets/icons/echo.svg"
                  }
                  alt="Echo"
                  value={likeCount}
                  title="Echoes"
                  textStyle="small-medium text-muted-foreground"
                  onClick={handleLikeClick}
                />
                <Metric
                  imgUrl={
                    hasReposted
                      ? "/assets/icons/echoOut-filled.svg"
                      : "/assets/icons/echoOut.svg"
                  }
                  alt="Echo Out"
                  value={repostCount}
                  title="Echo Outs"
                  textStyle="small-medium text-muted-foreground"
                  onClick={handleRepostClick}
                />
                <Metric
                  imgUrl="/assets/icons/echoBack.svg"
                  alt="Echo Backs"
                  value={replyCount}
                  title="Replies"
                  textStyle="small-medium text-muted-foreground"
                />
                {/* <Metric
                  imgUrl="/assets/icons/analytics.svg"
                  alt="Views"
                  value={228}
                  title="Views"
                  textStyle="small-medium text-muted-foreground"
                /> */}
                <Metric
                  imgUrl={
                    isBookmarked
                      ? "/assets/icons/bookmarks-fill.svg"
                      : "/assets/icons/bookmarks.svg"
                  }
                  alt="Bookmarks"
                  title="Bookmarks"
                  textStyle="small-medium text-muted-foreground"
                  onClick={handleBookmarkClick}
                />
              </div>
              {isEchoBack && echoBack.length > 0 && (
                <Link href={`/dev-pulse/${id}`}>
                  <p className="mt-1 text-start text-base text-muted-foreground">
                    {echoBack.length} repl{echoBack.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isEchoBack && echoBack.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {echoBack.slice(0, 2).map((echoBack, index) => (
            <Image
              key={index}
              src={echoBack}
              alt={`author_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}
          <Link href={`/dev-pulse/${id}`}>
            <p className="mt-1 text-base text-muted-foreground">
              {echoBack.length} repl{echoBack.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
    </article>
  );
};

export default Pulse;
