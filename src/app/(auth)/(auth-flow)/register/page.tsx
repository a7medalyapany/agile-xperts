import { FC } from "react";
import SignUpForm from "@/components/form/SignUpForm";

interface pageProps {}

const Page: FC<pageProps> = () => {
  return (
    <div className="flex flex-col gap-3">
      <SignUpForm />
    </div>
  );
};

export default Page;
