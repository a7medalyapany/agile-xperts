import { Separator } from "@/components/ui/separator";
import AccountForm from "@/components/form/settings/AccountForm";
import { getAccountFormData } from "@/lib/actions/user.action";

export default async function SettingsAccountPage() {
  const data = await getAccountFormData();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account Information. Set your GitHub account.
        </p>
      </div>
      <Separator />
      {data && <AccountForm userData={data} />}
    </div>
  );
}
