import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import FollowButton from "@/components/shared/FollowButton";
import { getUsersInSameTeam } from "@/lib/actions/user.action";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";

export async function UserYouMayKnow() {
  const supabase = createClient();
  const data = await getUsersInSameTeam();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id ?? "";

  return (
    <div className="rounded-lg border shadow-md">
      <h2 className="border-b px-4 py-3 text-lg font-semibold">
        People You May Know
      </h2>
      {data?.map((user) => (
        <div
          key={user.user_id}
          className="flex items-center justify-between p-4 hover:bg-muted/50"
        >
          <Link
            href={`/profile/${user.user_id}`}
            className="flex items-center gap-3"
          >
            <Avatar className="shrink-0 shadow-sm">
              <AvatarImage
                src={user.avatar_url}
                alt={`${user.name}'s avatar`}
              />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-start text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </Link>
          <FollowButton
            Following={false}
            userId={userId}
            targetUserId={user.user_id}
            className="h-fit min-w-[100px] rounded-full px-3 py-1.5 text-sm font-medium"
          />
        </div>
      ))}
    </div>
  );
}
