import { FC } from "react";
import SignInForm from "@/components/form/SignInForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface pageProps {
  searchParams: { message: string };
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const supabase = createClient();
  const { error } = await supabase.auth.getUser();
  if (!error) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-3">
      <SignInForm error={searchParams.message} />
    </div>
  );
};

export default Page;
