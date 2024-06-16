import { FC } from "react";
import CreateRepo from "@/components/form/ProjectRepo";
import { createClient } from "@/lib/supabase/server";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const supabase = createClient<Database>();
  const { data: technologies } = await supabase
    .from("technologies")
    .select("*")
    .neq("name", "Admin");
  return (
    <>
      <header className="flex py-4">
        <h1 className="line-clamp-2 text-2xl font-bold sm:text-3xl">
          Get Started: Bring Your Idea to Life
        </h1>
      </header>
      <CreateRepo technologies={technologies!} />
    </>
  );
};

export default Page;
