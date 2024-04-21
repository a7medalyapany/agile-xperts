import { FC } from "react";

interface EchoBackProps {}

const EchoBack: FC<EchoBackProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 11.5A8.38 8.38 0 0 0 18 5H6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h1v3l3-3h5a8.38 8.38 0 0 0 6.31-2.62M8 9h8m-8 4h6" />
    </svg>
  );
};

export default EchoBack;
