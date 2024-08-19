import { FC } from "react";
import Image from "next/image";
import FollowButton from "../../FollowButton";

interface UserResultsProps {}

const UserResults: FC<UserResultsProps> = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4].map((result, index) => (
        <div
          key={index}
          className="flex cursor-pointer flex-col items-center rounded-lg border p-4 drop-shadow-lg transition-transform duration-200 hover:scale-105"
        >
          <Image
            src={"https://avatars.githubusercontent.com/u/103336732?v=4"}
            // alt={`${result.artist} - ${result.title}`}
            alt={"name - title"}
            width={100}
            height={100}
            className="rounded-full"
          />
          <p className="mt-4 font-semibold">{/* {result.artist} */} Name</p>
          <p className="text-sm text-muted-foreground">
            {/* {result.title} */} title
          </p>
          <FollowButton
            Following={false}
            userId={""}
            targetUserId={""}
            className="mt-2 h-fit min-w-[100px] rounded-full px-3 py-1.5 text-sm font-medium"
          />
        </div>
      ))}
    </div>
  );
};

export default UserResults;
