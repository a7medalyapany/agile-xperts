"use client";

import Link from "next/link";
import Image from "next/image";
import { pageLinks } from "@/constants";
import { usePathname } from "next/navigation";

const ButtomSectionPagesLinks = () => {
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
      {pageLinks.slice(2).map((item) => (
        <Link
          key={item.route}
          href={item.route}
          passHref
          className={`${
            isActive(item.route) && "rounded-lg lg:bg-muted"
          } mt-2 flex items-center justify-center gap-4 p-4 text-foreground hover:rounded-lg hover:bg-muted lg:mx-2 lg:justify-start`}
        >
          <Image
            src={renderIcon(item.route, item.label)}
            alt={item.label}
            width={24}
            height={24}
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

export default ButtomSectionPagesLinks;
