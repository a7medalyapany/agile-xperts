"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { PageTitle } from "@/constants";

interface HeaderTitleProps {}

const HeaderTitle: FC<HeaderTitleProps> = () => {
  let pathname = usePathname();

  if (pathname.startsWith("/")) {
    pathname = pathname.slice(1);
  }

  if (pathname.includes("/")) {
    pathname = pathname.split("/")[0];
  }

  pathname = pathname
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const title = (PageTitle as { [key: string]: string })[pathname];

  return (
    <header className="flex py-4">
      <h1 className="line-clamp-2 text-2xl font-bold sm:text-3xl">
        {pathname}: {title}
      </h1>
    </header>
  );
};

export default HeaderTitle;
