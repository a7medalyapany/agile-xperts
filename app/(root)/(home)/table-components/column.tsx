"use client";
import Link from "next/link";
import { Task } from "@/lib/validation";
import { Link2Icon } from "lucide-react";
import { Icons } from "@/components/svg-icons/icons";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: () => <DataTableColumnHeader title="Title" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "technology_name",
    header: () => <DataTableColumnHeader title="Role" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("technology_name")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "github_repo_url",
    header: () => <DataTableColumnHeader title="GitHub" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Icons.gitHub className="mr-2 size-4 text-muted-foreground" />

          {/* eslint-disable-next-line camelcase */}
          <Link target={"_blank"} href={row.getValue("github_repo_url")}>
            <span>GitHub Repository</span>
          </Link>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "project_id",
    header: () => <DataTableColumnHeader title="Project" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Link2Icon className="mr-2 size-4 text-muted-foreground" />

          {/* eslint-disable-next-line camelcase */}
          <Link href={`/project/${row.getValue("project_id")}`}>
            <span>Check</span>
          </Link>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
