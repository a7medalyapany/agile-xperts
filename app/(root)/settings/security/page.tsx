import { FC } from "react";
import SecurityForm from "@/components/form/settings/SecurityForm";

interface pageProps {
  searchParams: { code: string };
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  return <SecurityForm />;
};

export default Page;
