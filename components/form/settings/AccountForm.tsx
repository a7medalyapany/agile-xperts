"use client";

import { useState } from "react";
import { Icons } from "@/components/svg-icons/icons";
import { Loader2, PlusIcon, TrashIcon } from "lucide-react";

import { z } from "zod";
import { accountFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/ui/TagInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { platformIcons } from "@/components/card/SocialAccounts";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateAccountForm } from "@/lib/actions/user.action";

platformIcons.GitHub = <Icons.gitHub className="size-5" />;
type AccountFormValues = z.infer<typeof accountFormSchema>;

interface AccountFormProps {
  userData: {
    profile: {
      id: string;
      about_me: string | null;
      skills: string[] | null;
    };
    socialAccounts: {
      id: number;
      platform: Database["public"]["Enums"]["social_media_platform"];
      account_link: string;
    }[];
  };
}

export default function AccountForm({ userData }: AccountFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      aboutMe: userData.profile.about_me || "",
      skills: userData.profile.skills || [],
      urls: userData.socialAccounts.map((account) => ({
        platform: account.platform,
        value: account.account_link,
      })) || [{ platform: "Other", value: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  async function onSubmit(data: AccountFormValues) {
    setIsPending(true);
    try {
      const result = await updateAccountForm(data);
      if (result.success) {
        toast.success("Your profile has been successfully updated.");
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  const detectPlatform = (url: string) => {
    const platformPatterns = {
      Google: /google\.com/,
      LinkedIn: /linkedin\.com/,
      X: /twitter\.com|x\.com/,
      Facebook: /facebook\.com/,
      Instagram: /instagram\.com/,
      GitHub: /github\.com/,
    };

    for (const [platform, pattern] of Object.entries(platformPatterns)) {
      if (pattern.test(url)) {
        return platform as keyof typeof platformIcons;
      }
    }
    return "Other";
  };

  const isFormChanged = () => {
    const currentValues = form.getValues();
    return (
      currentValues.aboutMe !== userData.profile.about_me ||
      JSON.stringify(currentValues.skills) !==
        JSON.stringify(userData.profile.skills) ||
      JSON.stringify(currentValues.urls) !==
        JSON.stringify(
          userData.socialAccounts.map((account) => ({
            platform: account.platform,
            value: account.account_link,
          }))
        )
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="aboutMe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Me</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className="resize-none bg-muted drop-shadow-lg"
                  placeholder="Tell us about yourself..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Keep it professional, but let your personality shine through!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <TagInput
                  placeholder="Add your skills..."
                  onKeywordsChange={(keywords: string[]) =>
                    field.onChange(keywords)
                  }
                  initialKeywords={field.value}
                />
              </FormControl>
              <FormDescription>
                Add multiple skills separated by commas, new lines, or tabs.
                Remove skills by pressing Backspace.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Social Media Links</FormLabel>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`urls.${index}`}
              render={({ field: urlField }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <div className="flex w-10 justify-center">
                        {platformIcons[urlField.value.platform]}
                      </div>
                      <Input
                        value={urlField.value.value}
                        onChange={(e) =>
                          urlField.onChange({
                            ...urlField.value,
                            value: e.target.value,
                          })
                        }
                        placeholder={`Enter your ${urlField.value.platform} URL`}
                        className="flex-1"
                        onBlur={(e) => {
                          const detectedPlatform = detectPlatform(
                            e.target.value
                          );
                          urlField.onChange({
                            ...urlField.value,
                            platform: detectedPlatform,
                          });
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Remove URL</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {fields.length < 8 && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => append({ platform: "Other", value: "" })}
            >
              <PlusIcon className="mr-2 size-4" />
              Add Social Media Link
            </Button>
          )}
        </div>

        <Button
          type="submit"
          className="w-full font-bold sm:w-[200px]"
          disabled={!isFormChanged() || isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
