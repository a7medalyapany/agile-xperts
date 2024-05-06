"use client";

import { useTheme } from "next-themes";

export function AppearancePage() {
  const { setTheme } = useTheme();

  return (
    <main className="flex flex-col gap-4">
      <header>
        <h4 className="text-xl font-normal">Theme</h4>
        <p className="font-normal text-muted-foreground">
          Select the theme for the dashboard.
        </p>
      </header>

      <div className="mt-8 space-y-1">
        <span className="font-normal">Light</span>
        <div className="cursor-pointer" onClick={() => setTheme("light")}>
          <div className="items-centerhover:text-accent-foreground rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="size-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="size-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <span className="font-normal">Dark</span>
        <div className="cursor-pointer" onClick={() => setTheme("dark")}>
          <div className="items-centerhover:text-accent-foreground rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="size-4 rounded-full bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="size-4 rounded-full bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
