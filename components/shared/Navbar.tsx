import { FC } from "react";
import UserAvatar from "./UserAvatar";
import LocalSearch from "./LocalSearch";
import SignedIn from "../Auth/SignedIn";
import { ModeToggle } from "@/components/ui/ModeToggle";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-30 mb-5 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:mt-2 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="relative flex-1 md:grow-0">
        <LocalSearch />

        <div className="[mask-image:linear-gradient(to_bottom,transparent,white,transparent)] sm:hidden">
          <h1 className="bg-foreground bg-clip-text text-3xl font-bold text-transparent">
            Agile Xperts
          </h1>
        </div>
      </div>

      <div className="hidden items-center justify-center gap-2 sm:flex">
        <ModeToggle />
        <SignedIn>
          <span className="h-7 w-[0.1px] rounded-lg border bg-border" />
          <UserAvatar />
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
