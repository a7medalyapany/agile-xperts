import React, { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <header className="flex py-4">
        <h1 className="line-clamp-2 text-2xl font-bold sm:text-3xl">
          Stay on the pulse of the latest in development
        </h1>
      </header>

      <div className="flex gap-4">
        {children}

        <aside className="sticky right-0 top-2 flex h-full flex-col rounded-lg border p-6 max-xl:hidden sm:w-[600px]">
          Recommendation Section
        </aside>
      </div>
    </>
  );
};

export default Layout;
