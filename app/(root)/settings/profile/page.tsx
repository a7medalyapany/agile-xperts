import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/form/settings/ProfileForm";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
