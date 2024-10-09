import React, { FC } from "react";
import { URLProps } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { getTeamMessages } from "@/lib/actions/chat.action";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ChatForm from "./chat-form";

interface PageProps extends URLProps {}

const Page: FC<PageProps> = async ({ params }) => {
  const supabase = createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const data = await getTeamMessages(parseInt(params.id));

  return (
    <div className="flex h-full min-h-[75vh] flex-col overflow-y-auto rounded-xl bg-muted/50 p-4 drop-shadow-md md:min-h-[84vh] lg:col-span-2">
      <Card className="flex grow flex-col">
        <CardHeader className="flex items-center space-x-4">
          {data.teamName}
        </CardHeader>
        <Separator />
        <CardContent className="mt-6 grow space-y-4 overflow-y-auto">
          {data.messages?.map((message, index) => (
            <div key={index}>
              {message.send_by !== user?.id && (
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  {message.sender_name}
                </p>
              )}
              <div
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.send_by === user.id
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <ChatForm userId={user.id} teamId={data.teamId} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
