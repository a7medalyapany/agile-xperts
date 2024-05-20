import { FC } from "react";
import CreateRepo from "@/components/form/ProjectRepo";

interface pageProps {
  searchParams: { message: string };
}

const Page: FC<pageProps> = ({ searchParams }) => {
  return (
    <>
      <header className="flex py-4">
        <h1 className="line-clamp-2 text-2xl font-bold sm:text-3xl">
          Get Started: Bring Your Idea to Life
        </h1>
      </header>
      <CreateRepo />
    </>
  );
};

export default Page;
