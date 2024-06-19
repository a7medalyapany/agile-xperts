import { FC } from "react";
import { INotification } from "@/types";
import { getTimeStamp } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ReadMore from "@/components/shared/ReadMore";
import Image from "next/image";

interface ActivityCardProps {
  notification: INotification;
}

const ActivityCard: FC<ActivityCardProps> = ({ notification }) => {
  return (
    <div className="flex gap-3 px-6 py-3 text-start hover:bg-muted">
      <Link href={`/profile/${notification.user_id!}`}>
        <Avatar className="shrink-0 drop-shadow-lg">
          <AvatarImage src={notification.avatar_url!} />
          <AvatarFallback>{notification.username![0]}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-0.5 text-start">
          <Link
            href={`/profile/${notification.user_id!}`}
            className="flex gap-0.5"
          >
            <h2 className="font-bold">{notification.name}</h2>
            <span className="text-foreground">·</span>
            <p className="text-muted-foreground">@{notification.username}</p>
          </Link>
          <p className="ml-auto text-muted-foreground">
            {getTimeStamp(notification.created_at!)}
          </p>
        </div>
        <div>
          <strong>
            {notification.username} {notification.notification_type} your pulse
          </strong>
        </div>
        <Link
          href={`/dev-pulse/${notification.related_post_id}`}
          className="w-full"
        >
          {notification.post_content && (
            <ReadMore
              text={notification.post_content}
              className="text-start text-sm"
            />
          )}
          {notification.post_img_url && (
            <Image
              src={notification.post_img_url}
              alt="pulse-photo"
              width={1200}
              height={400}
              className="xs:h-[400px] h-64 w-full rounded-lg object-cover lg:h-[450px]"
            />
          )}
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
