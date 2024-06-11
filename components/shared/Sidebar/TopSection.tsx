"use client";

import Link from "next/link";
import Image from "next/image";
import { pageLinks } from "@/constants";
import { usePathname } from "next/navigation";

const TopSection = () => {
  const pathname = usePathname();

  const isActive = (route: string) => {
    return pathname === route;
  };

  const renderIcon = (route: string, label: string) => {
    const iconName = isActive(route)
      ? `${label.toLowerCase()}-fill`
      : label.toLowerCase();
    return `/assets/icons/${iconName}.svg`;
  };

  return (
    <>
      {pageLinks.slice(0, 2).map((item: { route: string; label: string }) => (
        <Link
          key={item.route}
          href={item.route}
          passHref
          className={`${
            isActive(item.route) && "rounded-lg lg:bg-muted"
          } mb-2 flex items-center justify-center gap-4 p-4 hover:rounded-lg hover:bg-muted hover:text-foreground lg:mx-2 lg:justify-start`}
        >
          <Image
            src={renderIcon(item.route, item.label)}
            alt={item.label}
            width={24}
            height={24}
            // className={`invert-colors`}
          />
          <p
            className={`${isActive(item.route) ? "base-bold" : "base-medium"} max-lg:hidden`}
          >
            {item.label}
          </p>
        </Link>
      ))}
    </>
  );
};

export default TopSection;
