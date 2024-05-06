import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { SecurityForm } from "@/components/form/settings/SecurityForm";

interface pageProps {}

const Page: FC<pageProps> = () => {
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
      <SecurityForm />
    </div>
  );
};

export default Page;
