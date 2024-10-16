"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  forcedTheme?: string;
}

export function ThemeProvider({
  children,
  forcedTheme,
  ...props
}: ExtendedThemeProviderProps) {
  return (
    <NextThemesProvider {...props} forcedTheme={forcedTheme}>
      {children}
    </NextThemesProvider>
  );
}
