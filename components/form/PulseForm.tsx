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

import { CornerDownLeft, Paperclip } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Upload Image</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Upload Image</TooltipContent>
          </Tooltip>
          <Button
            type="submit"
            disabled={
              !form.formState.isDirty || !form.formState.isValid || isPosting
            }
            size="sm"
            className="ml-auto min-w-[120px] gap-1.5"
          >
            {isPosting ? "Pulsing..." : "Pulse"}
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PulseForm;
