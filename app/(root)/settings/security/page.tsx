import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { checkUserIdentity } from "@/lib/actions/user.action";
import SecurityForm from "@/components/form/settings/SecurityForm";

interface pageProps {
  searchParams: { code: string };
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const { identitiesNumber, hasGitHubIdentity } = await checkUserIdentity();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Adjust your security settings. Activate or deactivate two-factor
          authentication for added protection.
        </p>
      </div>
      <Separator />
      <SecurityForm
        identitiesNumber={identitiesNumber}
        hasGitHubIdentity={hasGitHubIdentity}
        code={searchParams.code}
      />
    </div>
  );
};

export default Page;
