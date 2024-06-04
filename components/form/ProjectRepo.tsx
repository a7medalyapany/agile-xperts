"use client";

import { z } from "zod";
import React, { FC, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/svg-icons/icons";

import { CreateProjectValidation } from "@/lib/validation";
import { ChevronsUpDown, Check, XIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UploadIcon } from "@/components/svg-icons/UploadIcon";
import { cn, getImageData } from "@/lib/utils";
import { frameworks } from "@/constants/dummy";
import Image from "next/image";

interface ProjectRepoProps {}

const ProjectRepo: FC<ProjectRepoProps> = () => {
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof CreateProjectValidation>>({
    resolver: zodResolver(CreateProjectValidation),
    defaultValues: {
      photo: undefined,
      name: "",
      teamName: "",
      description: "",
      private: false,
      title: "Agile Xperts",
      technologies: [
        {
          name: "",
          role: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  async function onSubmit(values: z.infer<typeof CreateProjectValidation>) {
    setIsSubmitting(true);
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleImageRemove = () => {
    setPreview("");
    form.setValue("photo", undefined);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-3"
        >
          <div className="h-full space-y-4 rounded-lg bg-card p-4 md:col-span-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="text-start">
                  <FormLabel>
                    Project Title
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...rest}
                      onChange={(event) => {
                        const { files, displayUrl } = getImageData(event);
                        setPreview(displayUrl);
                        onChange(files[0]);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {preview ? (
              <div className="rounded-lg drop-shadow-lg">
                <Image
                  src={preview}
                  alt="Uploaded Preview"
                  width={100}
                  height={100}
                  priority={true}
                  className="size-full rounded-lg object-cover"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={handleImageRemove}
                  className="absolute right-2 top-2 rounded-full"
                >
                  <XIcon />
                </Button>
              </div>
            ) : (
              <label
                htmlFor="imageInput"
                className="flex min-h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-muted p-4 drop-shadow-lg"
              >
                <UploadIcon className="size-12 text-muted-foreground" />
                <span className="mt-2 text-lg text-muted-foreground">
                  Upload Image
                </span>
              </label>
            )}
          </div>

          <div className="flex h-full flex-col space-y-4 rounded-lg bg-card p-4 md:col-span-2">
            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel>
                      Repository name
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel>
                      Team name
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <Input type="text" {...field} />
                        <FormField
                          control={form.control}
                          name="private"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0 rounded-md bg-muted p-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Private</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex grow">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex grow flex-col text-start">
                    <FormLabel>Description</FormLabel>
                    <FormControl className="grow">
                      <Textarea
                        className="grow resize-none bg-muted"
                        rows={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-full space-y-4 rounded-lg bg-card p-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                <FormField
                  control={form.control}
                  name={`technologies.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col text-start">
                      <FormLabel>
                        Technology
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-between bg-muted"
                          >
                            {field.value || "Select technology"}
                            <ChevronsUpDown className="ml-2 size-4 shrink-0" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search technology..." />
                            <CommandEmpty>No Tech found.</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {frameworks.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    onSelect={() => {
                                      form.setValue(
                                        `technologies.${index}.name`,
                                        framework.value
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        framework.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {framework.label}
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

                <div className="flex flex-col gap-2 space-y-4 sm:flex-row sm:gap-4 md:col-span-2">
                  <FormField
                    control={form.control}
                    name={`technologies.${index}.role`}
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col text-start">
                        <FormLabel>
                          Role
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-4 sm:flex-row">
                            <Input
                              {...form.register(`technologies.${index}.role`)}
                              placeholder="Role"
                              type="text"
                              className="w-full"
                              {...field}
                            />
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                              >
                                Remove Technology
                              </Button>
                            )}
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-end justify-end gap-4">
              {fields.length < 7 && (
                <Button
                  type="button"
                  variant={"ghost"}
                  className="border-2 border-muted dark:border-2"
                  onClick={() => append({ name: "", role: "" })}
                >
                  Add Technology
                </Button>
              )}
              <Button className="w-32" type="submit">
                {isSubmitting ? (
                  <>
                    Creating...
                    <Icons.spinner className="flex size-4 animate-spin justify-center" />
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProjectRepo;
