import { FC } from "react";
import Pulse from "@/components/card/Pulse";

import { pulses } from "@/constants/dummy";

interface pageProps {}

const Page: FC<pageProps> = () => {
  return (
    <div className="size-full space-y-4 overflow-auto sm:rounded-lg sm:border">
      {pulses.map((pulse) => (
        <Pulse
          key={pulse.id}
          id={pulse.id}
          author={pulse.author}
          content={pulse.content}
          photo={pulse.photo}
          isEchoBack={pulse.isEchoBack}
          echoBack={pulse.echoBack}
        />
      ))}
    </div>
  );
};

export default Page;
