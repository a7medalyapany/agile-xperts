import { FC } from "react";
import SignInForm from "@/components/form/SignInForm";

interface pageProps {}

const Page: FC<pageProps> = () => {
  return (
    <div className="flex flex-col gap-3">
      <SignInForm />
    </div>
  );
};

export default Page;
