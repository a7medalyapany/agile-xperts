"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider forcedTheme="dark" attribute="class">
      <div className="dark">{children}</div>
    </ThemeProvider>
  );
}
