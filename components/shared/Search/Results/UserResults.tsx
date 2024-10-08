import Link from "next/link";
import Image from "next/image";
// import FollowButton from "../../FollowButton";
import { FC, useEffect, useState } from "react";
import { searchUsers } from "@/lib/actions/search.action";

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

  if (loading) return <div>Loading...</div>;
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {users?.map((user, index) => (
        <div
          key={index}
          className="flex cursor-pointer flex-col items-center rounded-lg border p-4 drop-shadow-lg transition-transform duration-200 hover:scale-105"
        >
          <Link href={`/profile/${user.id}`}>
            <Image
              src={user.avatar_url!}
              alt={`${user.name}`}
              width={100}
              height={100}
              className="rounded-full"
            />
            <p className="mt-4 font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserResults;
