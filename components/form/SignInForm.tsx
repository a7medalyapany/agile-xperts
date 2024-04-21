"use client";

import { z } from "zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

import { SignInValidation } from "@/lib/validation";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { signIn, signInWithGithub } from "@/lib/actions/auth.action";
import { Icons } from "@/components/svg-icons/icons";
import { SubmitButton } from "./SubmitButton";

interface SignInFormProps {
  error: string;
}

const SignInForm: FC<SignInFormProps> = ({ error }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    setIsSubmitting(true);
    try {
      await signIn(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Sign up
      </Link>
      <h1 className="text-3xl font-bold">Access Point</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {isSubmitting ? (
              <>
                Signing...
                {"  "}
                <Icons.spinner className="flex size-4 animate-spin justify-center" />
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <div className="rounded-lg bg-card py-2 text-center text-destructive">
          {error}
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form>
        <SubmitButton formAction={signInWithGithub}>
          <Icons.gitHub className="mr-2 size-4" /> Github
        </SubmitButton>
      </form>
    </>
  );
};

export default SignInForm;
