import React from "react";
import SearchFilter from "@/components/shared/Search/FilterSidebar";

interface SettingsLayoutProps {
  children: React.ReactNode;
}
export default function SearchLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col sm:space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="hidden w-fit sm:block sm:w-1/5">
        <SearchFilter />
      </aside>
      <div className="block lg:max-w-2xl lg:flex-1">{children}</div>
    </div>
  );
}
