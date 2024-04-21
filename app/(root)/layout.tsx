import React, { FC } from "react";
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";
import Bottombar from "@/components/shared/Bottombar";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <main className="h-screen overflow-hidden p-2">
      <div className="flex size-full rounded-lg">
        <Sidebar />
        <div className="flex-1 overflow-auto rounded-lg bg-gradient-to-b from-muted/40 from-10% via-muted/30 via-40% to-card to-80% text-center sm:mb-0">
          <Navbar />
          <div className="mb-16 p-4 sm:mb-5 sm:px-6 sm:py-0">{children}</div>
        </div>
      </div>
      <Bottombar />
    </main>
  );
};

export default Layout;
