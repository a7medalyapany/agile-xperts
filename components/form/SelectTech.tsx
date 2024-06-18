"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FC } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SelectTechProps {
  technologies: {
    id: number;
    name: string;
    designation: string;
  }[];
  projectId: number;
}

const SelectTech: FC<SelectTechProps> = ({ technologies, projectId }) => {
  const FormSchema = z.object({
    technology: z.object({
      id: z.number(),
      name: z.string(),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    console.log(projectId);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Knock</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join request</DialogTitle>
          <DialogDescription>
            select which technology you want to join with
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="technology"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Your skill</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? technologies.find(
                                (technology) => technology.id === field.value.id
                              )?.name
                            : "Select technology"}
                          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {technologies.map((technology) => (
                              <CommandItem
                                value={technology.name}
                                key={technology.id}
                                onSelect={() => {
                                  form.setValue("technology", {
                                    id: technology.id,
                                    name: technology.name,
                                  });
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    technology.id === field.value?.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {technology.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-4 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Send Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SelectTech;
