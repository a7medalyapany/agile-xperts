"use client";
import React, { FC, useState } from "react";
import { Pulse } from "@/lib/actions/pulse.action";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { PostPulse } from "@/lib/validation";
import { Textarea } from "../ui/textarea";
import { UploadIcon } from "../svg-icons/UploadIcon";

interface PulseFormProps {
  placeholder?: string;
}

const PulseForm: FC<PulseFormProps> = ({ placeholder }) => {
  const [isPosting, setIsPosting] = useState(false);

  const form = useForm<z.infer<typeof PostPulse>>({
    resolver: zodResolver(PostPulse),
    defaultValues: {
      content: "",
      photo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostPulse>) {
    try {
      setIsPosting(true);
      await Pulse(values);
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-y p-6 pb-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  minLength={1}
                  maxLength={2200}
                  className="resize-none border-none bg-transparent text-lg placeholder:text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between px-2">
          <UploadIcon />
          <Button
            className="w-[100px] rounded-full font-bold"
            type="submit"
            disabled={
              !form.formState.isDirty || !form.formState.isValid || isPosting
            }
          >
            {isPosting ? "Pulsing..." : "Pulse"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PulseForm;
