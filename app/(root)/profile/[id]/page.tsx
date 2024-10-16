import { FC } from "react";
import Skills from "@/components/card/Skills";
import AboutMe from "@/components/card/AboutMe";
import UserProjects from "@/components/card/UserProjects";
import ProfileStatus from "@/components/card/ProfileStatus";
import SocialAccounts from "@/components/card/SocialAccounts";
import MostUsedLanguage from "@/components/card/MostUsedLanguage";

import {
  getUserById,
  getUserRoleById,
  getUserSocialMedia,
} from "@/lib/actions/user.action";
import { getGitHubUsername } from "@/lib/utils";

interface pageProps {
  params: {
    id: string;
  };
}

const Page: FC<pageProps> = async (data) => {
  const userId = data.params.id;
  const socialMedia = await getUserSocialMedia(userId);
  const githubUsername = getGitHubUsername(socialMedia);
  const userRole = await getUserRoleById(userId);

  const {
    streak_points: strakPoints,
    skills,
    about_me: aboutMe,
    user_level: level,
  } = await getUserById(userId);

  return (
    <main className="mb-2 mt-4 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col space-y-4 sm:space-y-2">
          <SocialAccounts socialMedia={socialMedia} />
          {githubUsername && (
            <MostUsedLanguage githubUsername={githubUsername} />
          )}
        </div>
        <ProfileStatus
          githubUsername={githubUsername!}
          strakPoints={strakPoints!}
          level={level!}
          userRole={userRole.role}
        />
      </div>

      {aboutMe && <AboutMe aboutMe={aboutMe!} />}
      {skills && skills.length > 0 && <Skills skills={skills!} />}

      <UserProjects userId={userId} />
    </main>
  );
};

export default Page;
