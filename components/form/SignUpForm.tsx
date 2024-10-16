"use client";

import { FC, useState } from "react";

import { z } from "zod";
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

import { SignUpValidation } from "@/lib/validation";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/svg-icons/icons";
import { SubmitButton } from "./SubmitButton";
import {
  checkUsernameUnique,
  signInWithGithub,
  signUp,
} from "@/lib/actions/auth.action";

interface SignUpFormProps {
  error: string;
}

const SignUpForm: FC<SignUpFormProps> = ({ error }) => {
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    setIsCreatingUser(true);
    setUsernameError(null);

    try {
      const isUnique = await checkUsernameUnique(values.username);
      if (!isUnique) {
        setUsernameError("Username is already taken");
        setIsCreatingUser(false);
        return;
      }

      await signUp(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingUser(false);
    }
  }
  return (
    <>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute text-foreground right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <h1 className="text-3xl font-bold text-foreground">Create an account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent text-foreground"
                    {...field}
                  />
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
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-transparent text-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username"
                    className="bg-transparent text-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {usernameError && (
                  <p className="text-sm text-destructive">{usernameError}</p>
                )}
              </FormItem>
            )}
          />
          <Button disabled={isCreatingUser} type="submit" className="w-full">
            {isCreatingUser ? (
              <>
                Creating Account...
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              </>
            ) : (
              "Sign Up"
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

export default SignUpForm;
