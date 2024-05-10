import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../SubmitButton";

export function GitHubForm() {
  const updateToken = async (formData: FormData) => {
    "use server";

    const username = formData.get("username") as string;
    const token = formData.get("token") as string;

    console.log(username, token);
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
    <form className="space-y-6">
      <div className="space-y-1">
        <Label>Username</Label>
        <Input name="username" disabled={true} value={"a7medalyapany"} />
        <p className={"text-sm text-muted-foreground"}>
          GitHub username is a primary username here.
        </p>
      </div>
      <div className="space-y-1">
        <Label>Token</Label>
        <Input name="token" />
        <p className={"text-sm text-muted-foreground"}>
          You can genrate custom token with scope &apos;repo&idkyet&apos; from
          GitHub. For more Info visit
          <Link href={"#"} className="pl-1 font-semibold underline">
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
  );
}
