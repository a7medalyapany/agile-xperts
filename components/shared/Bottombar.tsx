"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { PhonePageLinks } from "@/constants";
import { usePathname } from "next/navigation";

interface BottombarProps {}

const Bottombar: FC<BottombarProps> = () => {
  const pathname = usePathname();

  const isActive = (route: string) => {
    return pathname === route;
  };

  const renderIcon = (route: string, label: string) => {
    if (label.toLowerCase() === "settings") {
      if (isActive(route)) {
        return "/assets/icons/menu-fill.svg";
      }
      return "/assets/icons/menu.svg";
    } else {
      const iconName = isActive(route)
        ? `${label.toLowerCase()}-fill`
        : label.toLowerCase();
      return `/assets/icons/${iconName}.svg`;
    }
  };

  return (
    <section className="xs:px-5 fixed inset-x-2 bottom-0 rounded-lg bg-gradient-to-b from-neutral-300 p-1 backdrop-blur-lg dark:from-neutral-900 sm:hidden">
      <div className="xs:gap-5 flex items-center justify-between gap-1">
        {PhonePageLinks.map((link) => {
          return (
            <Link
              key={link.route}
              href={link.route}
              passHref
              className={`${
                isActive(link.route)
                  ? "rounded-lg text-primary"
                  : "text-muted-foreground"
              } mt-2 flex items-center justify-center gap-4 p-4 hover:rounded-lg hover:bg-muted hover:text-foreground lg:mx-2 lg:justify-start`}
            >
              <Image
                src={renderIcon(link.route, link.label)}
                alt={link.label}
                width={24}
                height={24}
                className="dark:invert"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
