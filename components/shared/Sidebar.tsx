import { SettingsIcon } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/server";

import TopSection from "@/components/shared/Sidebar/TopSection";
import ButtomSectionLinks from "@/components/shared/Sidebar/ButtomSectionPages";

const Sidebar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <aside className="left-0 top-0 flex flex-col gap-2 pr-2 max-sm:hidden lg:w-[266px]">
      <nav className="min-h-fit rounded-lg bg-card">
        <div className="flex h-14 items-center px-4">
          <Link
            className="flex w-14 items-center justify-center gap-2 text-lg font-semibold lg:justify-start"
            href="/"
          >
            <Image
              src="/dark-logo.svg"
              alt="Agile Xpert Logo"
              width={24}
              height={24}
              className="size-6 dark:invert"
            />
            <span className="sr-only">Agile Xperts logo</span>
          </Link>
        </div>
        <TopSection />
      </nav>

      <nav className="flex h-full flex-col rounded-lg bg-card">
        <ButtomSectionLinks />

        {user && (
          <div className="mt-auto flex flex-col gap-3 px-4 pb-4">
            <Link href={"/settings"} passHref>
              <Button variant={"default"} className="w-full">
                <SettingsIcon
                  strokeWidth={1.5}
                  size={20}
                  className={"lg:hidden"}
                />
                <span className="max-lg:hidden">Settings</span>
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
