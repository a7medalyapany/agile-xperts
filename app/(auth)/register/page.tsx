import { FC } from "react";
import SignUpForm from "@/components/form/SignUpForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.getUser();
  if (!error) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-3">
      <SignUpForm />
    </div>
  );
};

export default Page;
