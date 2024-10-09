"use client";
import { FC } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { securityFormSchema } from "@/lib/validation";
import { changeEmailPassword } from "@/lib/actions/auth.action";

interface SecurityFormProps {}

type SecurityFormValues = z.infer<typeof securityFormSchema>;

const SecurityForm: FC<SecurityFormProps> = () => {
  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      twoFactorAuth: false,
    },
    mode: "onChange",
  });

  async function onSubmit(data: SecurityFormValues) {
    try {
      await changeEmailPassword(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twoFactorAuth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="ml-2">
                    Enable Two-Factor Authentication
                  </FormLabel>
                </>
              </FormControl>
              <FormDescription>
                Boost your account&apos;s security by adding an extra layer of
                verification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-4"
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            form.formState.isSubmitting
          }
        >
          {form.formState.isSubmitting
            ? "Updating..."
            : " Update Security Settings"}
        </Button>
      </form>
    </Form>
  );
};

export default SecurityForm;
