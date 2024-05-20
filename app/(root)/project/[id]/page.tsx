import { FC } from "react";
import { URLProps } from "@/types";
import ProjectDetails from "@/components/card/ProjectDetails";

interface pageProps extends URLProps {}

const Page: FC<pageProps> = ({ params }) => {
  return (
    <div className="text-center">
      <ProjectDetails projectId={params.id} />
    </div>
  );
};

export default Page;
