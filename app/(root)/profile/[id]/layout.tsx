import React, { FC } from "react";
import { URLProps } from "@/types";
import Profile from "@/components/shared/profile/Profile";
import ProfileTabs from "@/components/shared/profile/ProfileTabs";
import { Separator } from "@/components/ui/separator";
import { Trending } from "@/components/card/RecommendationSideBar/trending";
import { UserYouMayKnow } from "@/components/card/RecommendationSideBar/UserYouMayKnow";

interface layoutProps extends URLProps {
  children: React.ReactNode;
}

const Layout: FC<layoutProps> = ({ children, params }) => {
  return (
    <>
      <div className="flex gap-4">
        <div className="flex w-full flex-col rounded-lg border-0 p-0 sm:border sm:p-2 sm:pb-0">
          <Profile profileId={params.id} />
          <Separator className="mb-2" />
          <ProfileTabs userId={params.id} />
          <main className="text-start">{children}</main>
        </div>
        <aside className="sticky right-0 top-2 flex h-full flex-col gap-4 max-xl:hidden sm:w-[600px]">
          <UserYouMayKnow />
          <Trending />
        </aside>
      </div>
    </>
  );
};

export default Layout;
