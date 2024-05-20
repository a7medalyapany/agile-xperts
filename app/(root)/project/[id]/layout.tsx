import React, { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
  chat: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children, chat }) => {
  return (
    <main className="grid gap-4 text-start md:grid-cols-2 lg:grid-cols-3">
      {chat}
      {children}
    </main>
  );
};

export default layout;
