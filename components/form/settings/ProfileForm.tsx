"use client";

import { useState } from "react";
import { CameraIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { profileFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { countries } from "@/constants";
import { cn, getImageData } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  photo: undefined,
  name: "",
  username: "",
  bio: "I own a computer.",
  country: undefined,
};

export function ProfileForm() {
  const supabase = createClient();
  const [preview, setPreview] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  async function onSubmit(data: ProfileFormValues) {
    let publicUrl = null;
    try {
      setIsUpdating(true);

      const file = data.photo;

      if (file) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        const fileExt = file.name.split(".").pop();
        const filePath = `${userId}-${Math.random()}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

        if (error) {
          throw new Error("Error uploading avatar: " + error.message);
        }

        if (data) {
          const {
            data: { publicUrl: url },
          } = supabase.storage.from("avatars").getPublicUrl(data.path);

          publicUrl = url;
        }
      }
      console.log(publicUrl);

      // await updateProfile(data.name, data.username, data.bio, data.country, publicUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="photo"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <>
                  <Avatar className="relative size-24 bg-muted sm:size-36">
                    <label
                      htmlFor="fileInput"
                      className="absolute flex size-full cursor-pointer items-center justify-center"
                    >
                      <div className="rounded-full bg-muted/50 p-2 drop-shadow-2xl">
                        <CameraIcon className="size-8 text-primary drop-shadow-lg" />
                      </div>
                    </label>
                    <AvatarImage src={preview} alt="profile photo" />
                  </Avatar>
                  <Input
                    id="fileInput"
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
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                It&apos;s best if it&apos;s your real name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Your username will be shown to others.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none bg-muted"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users to link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"country"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col text-start">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-between bg-muted"
                  >
                    {field.value
                      ? countries.find(
                          (country) => country.id === field.value?.id
                        )?.name
                      : "Select country"}
                    <ChevronsUpDownIcon className="ml-2 size-4 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandEmpty>No Tech found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.id}
                            onSelect={() => {
                              form.setValue("country", {
                                id: country.id,
                                name: country.name,
                              });
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.id === field.value?.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country.name}
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

        <Button
          className="w-[200px] font-bold"
          type="submit"
          disabled={
            !form.formState.isDirty || !form.formState.isValid || isUpdating
          }
        >
          {isUpdating ? "Updating..." : "Update profile"}
        </Button>
      </form>
    </Form>
  );
}
