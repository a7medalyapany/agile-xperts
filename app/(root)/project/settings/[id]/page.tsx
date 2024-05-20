import { FC } from "react";
import { URLProps } from "@/types";
import ProjectRepo from "@/components/form/ProjectRepo";

interface pageProps extends URLProps {}

const Page: FC<pageProps> = ({ params }) => {
  return (
    <>
      <header className="flex py-4">
        <h1 className="line-clamp-2 text-2xl font-bold sm:text-3xl">
          Update your project settings
        </h1>
      </header>
      <ProjectRepo />
    </>
  );
};

export default Page;
