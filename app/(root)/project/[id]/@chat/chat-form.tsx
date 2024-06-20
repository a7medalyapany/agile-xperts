"use client";
import React, { FC } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/lib/actions/chat.action";

interface chatFormProps {
  teamId: number;
  userId: string;
}

const ChatForm: FC<chatFormProps> = ({ teamId, userId }) => {
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await sendMessage({ teamId, userId, content: input });
        setInput("");
      }}
      className="flex w-full items-center space-x-2"
    >
      <Input
        id="message"
        placeholder="Type your message..."
        className="flex-1"
        autoComplete="off"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Button type="submit" size="icon" disabled={inputLength === 0}>
        <Send className="size-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};

export default ChatForm;
