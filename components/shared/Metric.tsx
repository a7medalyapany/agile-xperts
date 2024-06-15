import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value?: number;
  href?: string;
  title: string;
  textStyle?: string;
  isAuthor?: boolean;
}

const Metric: FC<MetricProps> = ({ imgUrl, alt, value, href, textStyle }) => {
  const metricContent = (
    <div className="flex cursor-pointer gap-2 p-2 hover:rounded-full hover:bg-primary/30 hover:backdrop-blur-lg">
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain invert  ${href ? "size-[28px] rounded-full" : ""}`}
      />
      {value !== undefined && value > 0 && (
        <p className={`${textStyle} flex items-center gap-1`}>
          {formatNumber(value)}
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center justify-center gap-1">
        {metricContent}
      </Link>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {metricContent}
    </div>
  );
};

export default Metric;
