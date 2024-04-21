import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import UserAvatar from "./UserAvatar";
import SignedIn from "../Auth/SignedIn";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-30 mb-5 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:mt-2 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="relative flex-1 md:grow-0">
        <div className="hidden sm:flex">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>

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
