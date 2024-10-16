import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });
const urlString =
  `https://${process.env.NEXT_PUBLIC_BASE_URL}` || "http://localhost:3000";
const urlObject = new URL(urlString);

export const metadata: Metadata = {
  metadataBase: urlObject,
  title: {
    default: "Agile Xperts - Where Agile Gets Lit!",
    template: "%s | Agile Xperts",
  },
  description:
    "Level up your game with Agile Xperts! Get dope solutions and take your agile skills to the next level.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.className}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
