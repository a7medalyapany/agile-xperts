import { FC } from "react";
import { CalendarDaysIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FollowersCounter from "../FollowersCounter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  socialLinks?: { name: string; url: string }[];
}

const Profile: FC<ProfileProps> = ({ socialLinks }) => {
  const location = "Alex";
  const joinedAt = "Joined - November 2020";

  return (
    <header className="flex w-full flex-col space-y-4 rounded-lg pb-4 md:flex-row md:justify-between">
      <div className="space-y-3 text-start">
        <div className="flex items-center gap-4 text-start">
          <Avatar className="size-16 bg-black sm:size-32">
            <AvatarImage src={"/assets/icons/profile.svg"} alt="@userPhoto" />
            <AvatarFallback>{"Pr"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="sm:h3-bold whitespace-nowrap font-bold">
              Ahmed Ibrahim
            </h2>
            <p className="text-muted-foreground">@alyapany</p>
          </div>
        </div>

        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
          illum!
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center justify-center gap-1">
              <MapPinIcon strokeWidth={1} size={16} />
              <p>{location}</p>
            </div>
          )}
          <div className="flex items-center justify-center gap-1">
            <CalendarDaysIcon strokeWidth={1} size={16} />
            <p>{joinedAt}</p>
          </div>
        </div>
        <FollowersCounter followers={4} following={20} />
      </div>
      <Button className="w-full md:w-[120px] md:rounded-full">Follow</Button>
    </header>
  );
};

export default Profile;
