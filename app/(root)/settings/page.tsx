import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { SettingsLinks, RemainingSettingsLinks } from "@/constants";

import { signOut } from "@/lib/actions/auth.action";
import { getCurrentUser } from "@/lib/actions/user.action";
export default async function SettingsProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() ?? "";

  return (
    <>
      <Image
        src={"/assets/images/settings-image.svg"}
        alt="Settings Image"
        width={350}
        height={250}
        className="hidden size-fit sm:block"
      />
      <main className="space-y-4 sm:hidden">
        <Card className="drop-shadow-md">
          <Link
            href={`/profile/${user.id}`}
            className="flex items-center gap-2 p-2"
          >
            <Avatar>
              <AvatarImage src={user.avatar_url ?? ""} alt="@userPhoto" />
              <AvatarFallback>{firstLetter}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{user.name}</h3>
          </Link>
        </Card>
        <Separator className="w-full bg-gradient-to-r from-transparent via-current to-transparent" />

        <div className="space-y-2">
          {RemainingSettingsLinks.map((item) => (
            <Card key={item.href} className="p-2 drop-shadow-md">
              <Link href={item.href}>{item.title}</Link>
            </Card>
          ))}
        </div>
        <Separator className="w-full bg-gradient-to-r from-transparent via-current to-transparent" />

        <div className="space-y-2 pt-4">
          {SettingsLinks.map((item) => (
            <Card key={item.href} className="p-2 drop-shadow-md">
              <Link href={item.href}>{item.title}</Link>
            </Card>
          ))}
        </div>

        <form action={signOut}>
          <Button variant={"secondary"} className="w-full">
            Logout
          </Button>
        </form>
      </main>
    </>
  );
}
