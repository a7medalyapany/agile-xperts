import { FC } from "react";
import { CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatDate } from "@/lib/utils";
import { getUserById } from "@/lib/actions/user.action";
import FollowersCounter from "@/components/shared/FollowersCounter";

interface ProfileProps {
  profileId: string;
}

const Profile: FC<ProfileProps> = async ({ profileId }) => {
  const data = await getUserById(profileId);

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
            <p>{formatDate(joinedAt!)}</p>
          </div>
        </div>
        <FollowersCounter followers={4} following={20} />
      </div>
      <Button className="w-full md:w-[120px] md:rounded-full">Follow</Button>
    </header>
  );
};

export default Profile;
