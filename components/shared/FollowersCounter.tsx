import { FC } from "react";
import Link from "next/link";
import { UsersIcon } from "lucide-react";

interface FollowersCounterProps {
  followers: number;
  following: number;
}

const FollowersCounter: FC<FollowersCounterProps> = ({
  followers,
  following,
}) => {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <UsersIcon strokeWidth={1} size={16} />
      <div className="flex items-center justify-center gap-2">
        <Link
          href="#"
          className="flex gap-1 text-sm text-foreground hover:underline"
        >
          {followers}
          <span className="text-muted-foreground">Followers</span>
        </Link>
        <span className="text-foreground">·</span>
        <Link
          href="#"
          className="flex gap-1 text-sm text-foreground hover:underline"
        >
          {following}
          <span className="text-muted-foreground">Following</span>
        </Link>
      </div>
    </div>
  );
};

export default FollowersCounter;
