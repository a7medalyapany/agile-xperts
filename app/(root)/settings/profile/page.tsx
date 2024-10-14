import { Separator } from "@/components/ui/separator";
import ProfileForm from "@/components/form/settings/ProfileForm";
import { getProfileFormData } from "@/lib/actions/user.action";

export default async function SettingsProfilePage() {
  const profileData = await getProfileFormData();
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm
        User={
          profileData ?? {
            name: null,
            username: null,
            avatar_url: null,
            bio: "",
            countries: null,
          }
        }
      />
    </div>
  );
}
