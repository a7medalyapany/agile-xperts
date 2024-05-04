"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";

interface ReadMoreProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ReadMore: FC<ReadMoreProps> = ({ text, maxLength = 350, className }) => {
  const isLongText = text.length > maxLength;
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className={`flex gap-1 text-foreground ${className}`}>
      {isExpanded || !isLongText ? (
        <p>{text}</p>
      ) : (
        <p>{text.slice(0, maxLength)}...</p>
      )}
      {isLongText && (
        <Button
          onClick={toggleExpanded}
          className={
            "bg-transparent p-0 h-fit hover:bg-transparent hover:underline " +
            (isExpanded ? "text-muted-foreground" : "text-primary")
          }
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </div>
  );
};

export default ReadMore;
