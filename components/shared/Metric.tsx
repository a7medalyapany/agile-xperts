import React, { FC } from "react";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import {
  Echo,
  EchoOut,
  EchoBack,
  Bookmark,
} from "@/components/svg-icons/icons";

interface MetricProps {
  icon: "echo" | "echoOut" | "echoBack" | "bookmark";
  alt: string;
  value?: number;
  href?: string;
  title: string;
  textStyle?: string;
  isAuthor?: boolean;
  onClick?: () => void;
  isFilled?: boolean;
  color?: string;
}

const Metric: FC<MetricProps> = ({
  icon,
  alt,
  value,
  href,
  title,
  textStyle,
  onClick,
  isFilled = false,
  color,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const IconComponent = {
    echo: Echo,
    echoOut: EchoOut,
    echoBack: EchoBack,
    bookmark: Bookmark,
  }[icon];

  const metricContent = (
    <div className="flex items-center gap-2">
      <div className="rounded-full p-2 transition-colors hover:bg-primary/30 hover:backdrop-blur-lg">
        <IconComponent
          filled={isFilled}
          className="size-4 shrink-0"
          color={color}
        />
      </div>
      <span className={`${textStyle} w-8 text-left`}>
        {value !== undefined && value > 0 ? formatNumber(value) : ""}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className="flex items-center justify-center"
        aria-label={`${title}: ${value || 0}`}
      >
        {metricContent}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center"
      aria-label={`${title}: ${value || 0}`}
    >
      {metricContent}
    </button>
  );
};

export default Metric;
