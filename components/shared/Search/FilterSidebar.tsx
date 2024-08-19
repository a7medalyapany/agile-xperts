"use client";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps extends React.HTMLAttributes<HTMLElement> {}

const SearchFilter: FC<FilterSidebarProps> = ({ className, ...props }) => {
  return (
    <aside
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="usecase">
          <AccordionTrigger>Use Case</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="flex w-full items-center gap-3 rounded-lg bg-muted p-2">
              <Checkbox />
              Next
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="framework">
          <AccordionTrigger>Framework</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="language">
          <AccordionTrigger>Language</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="database">
          <AccordionTrigger>Database</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="auth">
          <AccordionTrigger>Authentication</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="css">
          <AccordionTrigger>CSS</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="user">
          <AccordionTrigger>User</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="post">
          <AccordionTrigger>Post</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default SearchFilter;