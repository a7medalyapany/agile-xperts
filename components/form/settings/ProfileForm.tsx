"use client";

import { useState, useEffect } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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
import { profileFormSchema } from "@/lib/validation";
import { updateProfile } from "@/lib/actions/user.action";
import { checkUsernameUnique } from "@/lib/actions/auth.action";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  User: {
    name: string | null;
    username: string | null;
    avatar_url: string | null;
    bio: string | null;
    countries: { id: number; name: string | null } | null;
  };
}

export default function ProfileForm({ User }: ProfileFormProps) {
  const supabase = createClient();
  const [preview, setPreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      photo: undefined,
      name: User.name ?? undefined,
      username: User.username ?? undefined,
      bio: User.bio ?? undefined,
      country: User.countries
        ? { name: User.countries.name || undefined, id: User.countries.id }
        : undefined,
    },
  });

  useEffect(() => {
    if (User.avatar_url) {
      setPreview(User.avatar_url);
    }
  }, [User.avatar_url]);

  async function onSubmit(data: ProfileFormValues) {
    setIsUpdating(true);
    setUsernameError(null);
    try {
      const changedData: Partial<ProfileFormValues> = {};

      // Check each field for changes
      if (data.name !== User.name) changedData.name = data.name;
      if (data.username !== User.username) {
        // Check if the new username is unique
        const isUnique = await checkUsernameUnique(data.username);
        if (!isUnique) {
          setUsernameError("This username is already taken");
          setIsUpdating(false);
          return;
        }
        changedData.username = data.username;
      }
      if (data.bio !== User.bio) changedData.bio = data.bio;
      if (data.country?.id !== User.countries?.id)
        changedData.country = data.country;

      // Handle photo separately
      let newAvatarUrl: string | undefined;
      if (data.photo instanceof File) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(`${User.username}-${Date.now()}`, data.photo);

        if (uploadError)
          throw new Error("Error uploading avatar: " + uploadError.message);

        if (uploadData) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);
          newAvatarUrl = publicUrl;
        }
      }

      // Only update if there are changes
      if (Object.keys(changedData).length > 0 || newAvatarUrl) {
        const result = await updateProfile({
          ...changedData,
          avatar_url: newAvatarUrl,
        });
        if (result.success) {
          toast.success("Profile updated successfully");
        }
      } else {
        toast.warning("No changes to update");
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setIsUpdating(false);
    }
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
                    <AvatarImage src={preview || ""} alt="profile photo" />
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
              {usernameError && (
                <p className="text-sm text-destructive">{usernameError}</p>
              )}
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
          name="country"
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
                    <CommandEmpty>No country found.</CommandEmpty>
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
