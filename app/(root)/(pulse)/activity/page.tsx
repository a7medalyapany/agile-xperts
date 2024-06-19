import { FC } from "react";
import ActivityCard from "./activity-card";
import { Separator } from "@/components/ui/separator";
import { getUserNotifications } from "@/lib/actions/user.action";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const data = await getUserNotifications();
  console.log(data);

  return (
    <div className="size-full overflow-auto sm:rounded-lg sm:border">
      {data.map((notification) => (
        <>
          <ActivityCard
            key={notification.notification_id}
            notification={notification}
          />
          <Separator />
        </>
      ))}
    </div>
  );
};

export default Page;
