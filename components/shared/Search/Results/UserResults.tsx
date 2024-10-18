import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { searchUsers } from "@/lib/actions/search.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface UserResultsProps {
  userId: string | null;
  query: string;
}

const UserResults: FC<UserResultsProps> = ({ userId, query }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const result = await searchUsers(query);
      setUsers(result);
      setLoading(false);
    };

    fetchUsers();
  }, [query]);

  if (loading)
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 rounded border p-4 drop-shadow-lg"
          >
            <Skeleton className="size-28 rounded-full" />
            <Skeleton className="h-7 w-36 rounded-lg" />
            <Skeleton className="h-5 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    );
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {users?.map((user, index) => (
        <div
          key={index}
          className="flex cursor-pointer flex-col items-center rounded-lg border p-4 drop-shadow-lg transition-transform duration-200 hover:scale-105"
        >
          <Link href={`/profile/${user.id}`}>
            <Avatar className="size-16 sm:size-32">
              <AvatarImage src={user.avatar_url!} alt={user.name} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="mt-4 font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserResults;
