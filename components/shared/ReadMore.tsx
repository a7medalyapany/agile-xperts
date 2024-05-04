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
    <div className={`space-x-1 text-foreground ${className}`}>
      {isExpanded || !isLongText ? (
        <>
          <p className="inline">{text}</p>
          {isLongText && (
            <Button
              onClick={toggleExpanded}
              className="h-fit bg-transparent p-0 font-semibold text-muted-foreground hover:bg-transparent hover:underline"
            >
              Read Less
            </Button>
          )}
        </>
      ) : (
        <>
          <p className="inline">{text.slice(0, maxLength)}...</p>
          <Button
            onClick={toggleExpanded}
            className="h-fit bg-transparent p-0 font-semibold text-primary hover:bg-transparent hover:underline"
          >
            Read More
          </Button>
        </>
      )}
    </div>
  );
};

export default ReadMore;
