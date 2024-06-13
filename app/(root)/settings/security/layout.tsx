import { Separator } from "@/components/ui/separator";
import React, { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Adjust your security settings. Activate or deactivate two-factor
          authentication for added protection.
        </p>
      </div>
      <Separator />
      {children}
    </div>
  );
};

export default Layout;
