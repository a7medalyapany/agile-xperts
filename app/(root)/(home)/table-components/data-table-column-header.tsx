import React from "react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function DataTableColumnHeader({
  title,
  className,
}: DataTableColumnHeaderProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
