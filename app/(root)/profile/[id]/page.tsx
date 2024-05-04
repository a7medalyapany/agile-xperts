import { FC } from "react";
import Skills from "@/components/card/Skills";
import UserProjects from "@/components/card/UserProjects";
import ProfileStatus from "@/components/card/ProfileStatus";
import SocialAccounts from "@/components/card/SocialAccounts";
import MostUsedLanguage from "@/components/card/MostUsedLanguage";

interface pageProps {}

const Page: FC<pageProps> = () => {
  return (
    <main className="mb-2 mt-4 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-4 sm:space-y-2">
          <SocialAccounts />
          <MostUsedLanguage />
        </div>
        <ProfileStatus />
      </div>
      <Skills />
      <UserProjects />
    </main>
  );
};

export default Page;
