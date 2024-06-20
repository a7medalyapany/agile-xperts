"use client";
import { FC } from "react";
import Link from "next/link";
import { ArrowLeftIcon, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface LocalSearchProps {}

const LocalSearch: FC<LocalSearchProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/search")
    return (
      <div className="hidden sm:flex">
        <button
          onClick={router.back}
          className="flex items-center gap-1 rounded-full bg-black p-2 text-white hover:bg-black/30 dark:hover:bg-muted"
        >
          <ArrowLeftIcon />
        </button>
      </div>
    );
  return (
    <div className="hidden sm:flex">
      <Link
        href={"/search"}
        className="flex h-10 w-full items-center rounded-lg bg-card pl-8 text-muted-foreground md:w-[200px] lg:w-[336px]"
      >
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        Search...
      </Link>
    </div>
  );
};

export default LocalSearch;
