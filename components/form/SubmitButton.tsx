"use client";

import { useFormStatus } from "react-dom";
import React, { type ComponentProps } from "react";
import { Icons } from "../svg-icons/icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button"> & {};

export function SubmitButton({ children, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      {...props}
      type="submit"
      aria-disabled={pending}
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        "w-full rounded-md border text-foreground px-4 py-2"
      )}
    >
      {isPending ? (
        <>
          {children}
          <Icons.spinner className="ml-2 flex size-4 animate-spin justify-center" />
        </>
      ) : (
        children
      )}
    </button>
  );
}
