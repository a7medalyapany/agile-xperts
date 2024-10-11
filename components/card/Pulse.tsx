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
  hasLiked: initialHasLiked,
  hasReposted: initialHasReposted,
  hasBookmarked: initialHasBookmarked,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialHasBookmarked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [repostCount, setRepostCount] = useState(initialRepostCount);
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [hasReposted, setHasReposted] = useState(initialHasReposted);

  const handleLikeClick = async () => {
    const newHasLiked = !hasLiked;
    const newLikeCount = likeCount + (newHasLiked ? 1 : -1);

    setHasLiked(newHasLiked);
    setLikeCount(newLikeCount);

    try {
      const result = await handlePulseLike({ postId: id });
      if (result?.likeCount !== newLikeCount) {
        setLikeCount(result?.likeCount!);
        setHasLiked(!newHasLiked);
      }
    } catch (error) {
      console.error(error);
      setHasLiked(!newHasLiked);
      setLikeCount(likeCount);
    }
  };

  const handleRepostClick = () => {
    const newHasReposted = !hasReposted;
    const newRepostCount = repostCount + (newHasReposted ? 1 : -1);

    setHasReposted(newHasReposted);
    setRepostCount(newRepostCount);

    // Simulate a server request here for repost action
    // Perform async action and update state if necessary
  };

  const handleBookmarkClick = async () => {
    const newIsBookmarked = !isBookmarked;
    setIsBookmarked(newIsBookmarked);

    try {
      await handlePulseBookMark({ postId: id });
    } catch (error) {
      console.error(error);
      setIsBookmarked(!newIsBookmarked);
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
                <AvatarImage
                  src={authorAvatar}
                  alt={`${authorName}'s avatar`}
                />
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
                  alt="Pulse content"
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
                  icon="echo"
                  alt="Echo"
                  value={likeCount}
                  title="Echoes"
                  textStyle="small-medium text-muted-foreground"
                  onClick={handleLikeClick}
                  isFilled={hasLiked}
                  color={hasLiked ? "#ff6b6b" : undefined}
                />
                <Metric
                  icon="echoOut"
                  alt="Echo Out"
                  value={repostCount}
                  title="Echo Outs"
                  textStyle="small-medium text-muted-foreground"
                  onClick={handleRepostClick}
                  isFilled={hasReposted}
                  color={hasReposted ? "#51cf66" : undefined}
                />
                <Metric
                  href={`/dev-pulse/${id}`}
                  icon="echoBack"
                  alt="Echo Backs"
                  value={replyCount}
                  title="Replies"
                  textStyle="small-medium text-muted-foreground"
                />
                <Metric
                  icon="bookmark"
                  alt="Bookmarks"
                  title="Bookmarks"
                  textStyle="small-medium text-muted-foreground"
                  onClick={handleBookmarkClick}
                  isFilled={isBookmarked}
                  color={isBookmarked ? "#acacac" : undefined}
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
              alt={`Author ${index + 1}`}
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
