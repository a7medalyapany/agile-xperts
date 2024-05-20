import { FC } from "react";
import { URLProps } from "@/types";

interface pageProps extends URLProps {}

const page: FC<pageProps> = ({ params }) => {
  return <div>Project-settings: {params.id}</div>;
};

export default page;
