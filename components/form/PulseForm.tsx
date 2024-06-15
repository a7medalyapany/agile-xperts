"use client";

import { FC, useState } from "react";
import { CornerDownLeftIcon, PaperclipIcon, XIcon } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { getImageData } from "@/lib/utils";
import { PostPulse } from "@/lib/validation";
import { createClient } from "@/lib/supabase/client";
import { postPulse } from "@/lib/actions/pulse.action";

type PulseFormSchema = z.infer<typeof PostPulse>;

interface PulseFormProps {
  placeholder: string;
  parentPostId?: number;
}

const PulseForm: FC<PulseFormProps> = ({ placeholder, parentPostId }) => {
  const supabase = createClient();
  const [preview, setPreview] = useState("");

  const form = useForm<PulseFormSchema>({
    resolver: zodResolver(PostPulse),
    defaultValues: {
      content: "",
      photo: undefined,
    },
  });

  async function onSubmit(data: PulseFormSchema) {
    let publicUrl: string | undefined;
    try {
      const file = data.photo;

      if (file) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        const filePath = `${userId}/${Math.random()}-${file.name}`;

        const { data, error } = await supabase.storage
          .from("public_posts")
          .upload(filePath, file);

        if (error) {
          throw new Error("Error uploading posts image: " + error.message);
        }

        if (data) {
          const {
            data: { publicUrl: url },
          } = supabase.storage.from("public_posts").getPublicUrl(data.path);

          publicUrl = url;
        }
      }

      await postPulse({
        content: data.content,
        imgUrl: publicUrl,
        parentId: parentPostId,
      });
      form.reset();
      setPreview("");
    } catch (error) {
      console.error(error);
    }
  }
  const handleImageRemove = () => {
    setPreview("");
    form.setValue("photo", undefined);
  };

  const isFormEmpty = !form.watch("content") && !form.watch("photo");
  const disabledStatus =
    isFormEmpty ||
    form.formState.isSubmitting ||
    !form.formState.isDirty ||
    !form.formState.isValid;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-2 sm:p-6 sm:pb-0"
      >
        <div className="flex flex-col space-y-4 rounded-lg rounded-b-none bg-muted/40 drop-shadow-md">
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      minLength={1}
                      maxLength={2200}
                      {...field}
                      placeholder={placeholder}
                      className="mt-2 min-h-fit resize-none border-none bg-transparent px-4 text-lg placeholder:text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {preview && (
              <div className="relative p-4 drop-shadow-lg">
                <Image
                  src={preview}
                  alt="Image Preview"
                  width={1200}
                  height={400}
                  priority={true}
                  className="xs:h-[400px] h-64 w-full rounded-lg object-cover lg:h-[450px]"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={handleImageRemove}
                  className="absolute right-6 top-6 rounded-full"
                >
                  <XIcon />
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-between p-2 pt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="cursor-pointer rounded-lg bg-transparent p-3 hover:bg-secondary">
                  <PaperclipIcon className="size-4" />
                  <span className="sr-only">Attach file</span>
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormControl>
                          <Input
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
                </label>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>

            <Button
              type="submit"
              size="sm"
              disabled={disabledStatus}
              className="ml-auto min-w-[120px] gap-1.5"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Pulse"}
              <CornerDownLeftIcon className="size-3.5" />
            </Button>
          </div>
        </div>
        <Separator className="w-full bg-gradient-to-r from-transparent via-current to-transparent" />
      </form>
    </Form>
  );
};

export default PulseForm;
