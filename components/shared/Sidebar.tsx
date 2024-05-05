"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { pageLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
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
    <aside className="left-0 top-0 flex flex-col gap-2 pr-2 max-sm:hidden lg:w-[266px]">
      <nav className="min-h-fit rounded-lg bg-card">
        <div className="flex h-14 items-center px-4">
          <Link
            className="flex w-14 items-center justify-center gap-2 text-lg font-semibold lg:justify-start"
            href="#"
          >
            <Image
              src="/dark-logo.svg"
              alt="Agile Xpert Logo"
              width={24}
              height={24}
              className="hidden size-6"
            />
            <Image
              src="/light-logo.svg"
              alt="Agile Xpert Logo"
              width={24}
              height={24}
              className="size-6 dark:block"
            />
            <span className="sr-only">Agile Xperts logo</span>
          </Link>
        </div>
        {pageLinks.slice(0, 2).map((item) => (
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
      </nav>

      <nav className="flex h-full flex-col rounded-lg bg-card">
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

        <div className="mt-auto flex flex-col gap-3 px-4 pb-4">
          <Link href={"/settings"} passHref>
            <Button variant={"default"} className="w-full">
              <Image
                src="/assets/icons/account.svg"
                alt="settings icon"
                width={20}
                height={20}
                className={"lg:hidden"}
              />
              <span className="max-lg:hidden">Settings</span>
            </Button>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
