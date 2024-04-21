import { FC } from "react";
import Image from "next/image";

interface EchoProps {
  className?: string;
}

const Echo: FC<EchoProps> = ({ className }) => {
  return (
    <Image
      width="64"
      height="64"
      src="https://img.icons8.com/pastel-glyph/64/sales-growth.png"
      alt="sales-growth"
      className={className}
    />
  );
};

export default Echo;
