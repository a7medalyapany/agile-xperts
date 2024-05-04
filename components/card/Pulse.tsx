import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IPulseProps } from "@/types";
import Metric from "../shared/Metric";
import ReadMore from "../shared/ReadMore";

const Pulse: FC<IPulseProps> = ({
  id,
  author,
  content,
  echoBack,
  isEchoBack,
  photo,
}) => {
  return (
    <article
      className={`flex w-full flex-col border-b p-0
      sm:p-6  ${isEchoBack ? "py-6" : "pb-6"}`}
    >
      <div className="flex items-start">
        <div className="flex w-full flex-1 flex-row gap-2">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative size-11">
              <Avatar>
                <AvatarImage src={author.imgUrl} alt="@userPhoto" />
                <AvatarFallback>{author.firstLetter}</AvatarFallback>
              </Avatar>
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
          </div>

          <div className="flex w-full flex-col space-y-2">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="base-medium cursor-pointer font-bold">
                {author.name}
              </h4>
            </Link>

            <ReadMore text={content} className="text-start text-sm" />

            {photo && (
              <Image
                src={photo}
                alt="pulse-photo"
                width={1200}
                height={400}
                className=" xs:h-[400px] h-64 w-full rounded-lg object-cover lg:h-[450px]"
              />
            )}

            <div
              className={`${isEchoBack && "mb-10"} mt-5 flex flex-col gap-3`}
            >
              <div className="flex w-full items-center justify-between">
                <Metric
                  imgUrl="/assets/icons/echo.svg"
                  alt="Echo"
                  value={13}
                  title="Echoes"
                  textStyle="small-medium text-muted-foreground"
                />
                <Metric
                  imgUrl="/assets/icons/echoOut.svg"
                  alt="Echo Out "
                  value={112}
                  title="Echo Outs"
                  textStyle="small-medium text-muted-foreground"
                />
                <Metric
                  imgUrl="/assets/icons/echoBack.svg"
                  alt="Echo Backs"
                  value={74}
                  title="Replies"
                  textStyle="small-medium text-muted-foreground"
                />
                <Metric
                  imgUrl="/assets/icons/analytics.svg"
                  alt="Heart"
                  value={228}
                  title={`Views`}
                  textStyle="small-medium text-muted-foreground"
                />
                <Metric
                  imgUrl={"/assets/icons/bookmarks-fill.svg"}
                  alt="Bookmarks"
                  value={6}
                  title={`Bookmarks`}
                  textStyle="small-medium text-muted-foreground"
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

        {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
      </div>

      {!isEchoBack && echoBack.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {echoBack.slice(0, 2).map((echoBack, index) => (
            <Image
              key={index}
              src={echoBack.author.imgUrl}
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
