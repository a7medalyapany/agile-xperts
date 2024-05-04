"use client";
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileTabsProps {
  userId: string;
}

const ProfileTabs: FC<ProfileTabsProps> = ({ userId }) => {
  const pathname = usePathname();

  return (
    <nav className="mb-4 w-full rounded-md bg-card dark:bg-background sm:mb-0 sm:w-fit">
      <ul className="flex flex-wrap items-center justify-evenly gap-4 p-1.5 sm:justify-start">
        <li
          className={`min-w-32 text-muted-foreground ${pathname === `/profile/${userId}` && "rounded-md bg-primary py-1.5 font-bold text-primary-foreground"}`}
        >
          <Link
            className="hover:text-primary-foreground"
            href={`/profile/${userId}`}
          >
            Overview
          </Link>
        </li>
        <li
          className={`min-w-32 text-muted-foreground ${pathname === `/profile/${userId}/posts` && "rounded-md bg-primary py-1.5 font-bold text-primary-foreground"}`}
        >
          <Link
            className="hover:text-primary-foreground"
            href={`/profile/${userId}/posts`}
          >
            Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileTabs;
