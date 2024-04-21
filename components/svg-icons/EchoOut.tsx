import { FC } from "react";

interface EchoOutProps {}

const EchoOut: FC<EchoOutProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M17 12h6m-11 5v6m0-16V1M7 12H1m17.36-6.36 3.07-3.07M5.64 5.64 2.57 2.57m15.79 15.79 3.07 3.07M5.64 18.36l-3.07 3.07" />
    </svg>
  );
};

export default EchoOut;
