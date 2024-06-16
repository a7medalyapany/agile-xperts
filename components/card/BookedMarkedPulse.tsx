"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import ReadMore from "../shared/ReadMore";
import { removeBookmarkedPulse } from "@/lib/actions/pulse.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BookmarksPulseProps {
  id: number;
  content?: string | null;
  photo?: string | null;
  authorId: string;
  authorName: string;
  authorAvatar: string;
}

const BookmarksPulse: FC<BookmarksPulseProps> = ({
  id,
  content,
  photo,
  authorId,
  authorName,
  authorAvatar,
}) => {
  return (
    <article className={"flex w-full flex-col border-b p-0 sm:p-6"}>
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
            <div className={"flex flex-col gap-3 pt-5"}>
              <Button
                onClick={() => removeBookmarkedPulse({ bookmarkId: id })}
                className="border bg-muted text-foreground hover:border-red-500 hover:bg-muted"
              >
                Remove this pulse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookmarksPulse;
