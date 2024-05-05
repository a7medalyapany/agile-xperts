import React from "react";

import { SettingsLinks } from "@/constants";
import { Separator } from "@/components/ui/separator";
import { SettingsSidebarNav } from "@/components/shared/SettingsSidebar";

interface SettingsLayoutProps {
  children: React.ReactNode;
}
export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="text-start sm:space-y-4">
      <div className="hidden space-y-0.5 sm:block">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Separator className="my-6 hidden sm:block" />
      <div className="flex flex-col sm:space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="hidden w-fit sm:block sm:w-1/5">
          <SettingsSidebarNav items={SettingsLinks} />
        </aside>
        <div className="block lg:max-w-2xl lg:flex-1">{children}</div>
      </div>
    </div>
  );
}
