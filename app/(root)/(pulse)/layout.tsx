import { UserYouMayKnow } from "@/components/card/RecommendationSideBar/UserYouMayKnow";
import { Trending } from "@/components/card/RecommendationSideBar/trending";
import HeaderTitle from "@/components/shared/HeaderTitle";
import React, { FC } from "react";


interface layoutProps {
  children: React.ReactNode;
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <HeaderTitle />

      <div className="flex gap-4">
        {children}

        <aside className="sticky right-0 top-2 flex h-full flex-col rounded-lg border p-6 max-xl:hidden sm:w-[600px]">
          <Trending/>
          <UserYouMayKnow/>
        </aside>
      </div>
    </>
  );
};

export default Layout;
