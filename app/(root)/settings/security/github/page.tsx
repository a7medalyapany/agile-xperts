import { FC } from "react";
import { redirect } from "next/navigation";

import { checkUserIdentity } from "@/lib/actions/user.action";
import GitHubSecurityForm from "@/components/form/settings/GitHubSecurityForm";

interface pageProps {
  searchParams: {
    code: string;
    message: string;
  };
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const { identitiesNumber, hasGitHubIdentity } = await checkUserIdentity();

  if (identitiesNumber > 1 || !hasGitHubIdentity) {
    redirect("/settings/security");
  }
  return (
    <div className="space-y-6">
      <GitHubSecurityForm code={searchParams.code} />
      {searchParams.message && (
        <div className="rounded-lg bg-card py-2 text-center text-destructive dark:bg-muted/50">
          <strong>Check your email to rest password.</strong>
        </div>
      )}
    </div>
  );
};

export default Page;
