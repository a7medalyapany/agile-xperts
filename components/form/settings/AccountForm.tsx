"use client";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/ui/TagInput";

const accountFormSchema = z.object({
  aboutMe: z
    .string()
    .trim()
    .max(2200, {
      message: "Your about me text should not exceed 2200 characters",
    })
    .optional(),
  skills: z
    .array(
      z
        .string()
        .trim()
        .min(1, { message: "Atleast one charachter" })
        .max(30, { message: "skill should not exceed 30 characters" })
    )
    .optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  aboutMe:
    "Hey there! I'm [Your Name], a [Your Title/Role] with a passion for [Your Passion/Specialization]. With [X] years of experience in [Your Field], I've honed my skills in [Your Skills/Expertise]. I thrive in [Describe Your Work Environment/Preferred Projects], and I'm always down to tackle new challenges and learn something fresh. Let's connect and make magic happen!",
  skills: [],
  urls: [{ value: "http://twitter.com/ahmedalyapany1" }],
};

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
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
          name="aboutMe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Me</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className="resize-none bg-muted text-foreground"
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
                  placeholder="Please list your relevant skills here."
                  onKeywordsChange={(keywords: string[]) =>
                    field.onChange(keywords)
                  }
                />
              </FormControl>
              <FormDescription>
                Paste multiple skills separated by commas, new lines, or tabs.
                Remove Skills by pressing Backspace.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Input {...field} />
                      {fields.length > 0 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          Remove URL
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {fields.length < 7 && (
            <Button
              type="button"
              variant="outline"
              className="mt-4 sm:w-[135px]"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          )}
        </div>

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
