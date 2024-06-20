import { FC } from "react";
import { CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatDate } from "@/lib/utils";
import FollowButton from "../FollowButton";
import { createClient } from "@/lib/supabase/server";
import { getUserById } from "@/lib/actions/user.action";
import { checkIsFollowing, getFollowCount } from "@/lib/actions/follow.action";
import FollowersCounter from "@/components/shared/FollowersCounter";

interface ProfileProps {
  profileId: string;
}

const Profile: FC<ProfileProps> = async ({ profileId }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = await getUserById(profileId);
  console.log(data);

  const isFollowing = await checkIsFollowing({
    userId: user?.id!,
    targetUserId: profileId,
  });
  console.log(isFollowing);

  const { followers, following } = await getFollowCount(profileId);

  console.log(followers, following);

  const {
    name,
    username,
    avatar_url: avatarUrl,
    bio,
    country_name: location,
    created_at: joinedAt,
  } = data;

  return (
    <header className="flex w-full flex-col space-y-4 rounded-lg pb-4 md:flex-row md:justify-between">
      <div className="space-y-3 text-start">
        <div className="flex items-center gap-4 text-start">
          <Avatar className="size-16 bg-black sm:size-32">
            <AvatarImage src={avatarUrl!} alt="@userPhoto" />
            <AvatarFallback>{name![0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="sm:h3-bold whitespace-nowrap font-bold">
              {name ?? ""}
            </h2>
            <p className="text-muted-foreground">@{username}</p>
          </div>
        </div>

        {bio && <p className="text-sm">{bio}</p>}

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center justify-center gap-1">
              <MapPinIcon strokeWidth={1} size={16} />
              <p>{location}</p>
            </div>
          )}
          <div className="flex items-center justify-center gap-1">
            <CalendarDaysIcon strokeWidth={1} size={16} />
            <p>
              {formatDate({
                dateString: joinedAt!,
                type: "joinedAt",
              })}
            </p>
          </div>
        </div>
        <FollowersCounter
          followers={followers || 0}
          following={following || 0}
        />
      </div>
      {user?.id !== profileId && (
        <FollowButton
          userId={user?.id!}
          targetUserId={profileId}
          Following={isFollowing}
        />
      )}
    </header>
  );
};

export default Profile;
