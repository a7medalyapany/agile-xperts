import React, { FC } from "react";
import { createClient } from "@/lib/supabase/server";

interface SignedInProps {
  children: React.ReactNode;
}

const SignedIn: FC<SignedInProps> = async ({ children }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }
  return <>{children}</>;
};

export default SignedIn;
