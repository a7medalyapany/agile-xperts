import { FC } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../SubmitButton";

interface GitHubFormProps {
  githubUsername: string;
}

export const GitHubForm: FC<GitHubFormProps> = ({ githubUsername }) => {
  const updateToken = async (formData: FormData) => {
    "use server";

    const token = formData.get("token") as string;

    console.log(token);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  };

  return (
    <>
      <div className="space-y-1">
        <Label>Username</Label>
        <Input readOnly disabled={true} value={githubUsername} />
        <p className={"text-sm text-muted-foreground"}>
          GitHub username is not a primary username here.
        </p>
      </div>
      <form className="space-y-6">
        <div className="space-y-1">
          <Label>Token</Label>
          <Input
            name="token"
            readOnly
            disabled={true}
            value={"This feature is not implemented yet."}
          />
          <p className={"text-sm text-muted-foreground"}>
            You can genrate custom token with scope
            <span className="mx-1 whitespace-nowrap rounded-xl bg-destructive/40 px-2 font-bold">
              repo & delete_repo
            </span>
            from GitHub. For more Info visit
            <Link
              target="_blank"
              href={
                "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
              }
              className="pl-1 font-semibold underline"
            >
              GitHub Docs
            </Link>
          </p>
        </div>
        <SubmitButton
          formAction={updateToken}
          pendingText="Updating..."
          className="w-[150px] bg-primary text-primary-foreground hover:bg-primary"
        >
          Update profile
        </SubmitButton>
      </form>
    </>
  );
};
