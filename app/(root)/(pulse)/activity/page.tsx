import React, { FC } from "react";
import ActivityCard from "./activity-card";
import { Separator } from "@/components/ui/separator";
import { getUserNotifications } from "@/lib/actions/user.action";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const data = await getUserNotifications();

  return (
    <div className="size-full overflow-auto sm:rounded-lg sm:border">
      {data.map((notification, idx) => (
        <React.Fragment key={notification.notification_id ?? idx}>
          <ActivityCard notification={notification} />
          <Separator />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Page;
