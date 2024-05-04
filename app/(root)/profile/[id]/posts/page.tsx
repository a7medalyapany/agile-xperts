import { FC } from "react";
import Pulse from "@/components/card/Pulse";

import { pulses } from "@/constants/dummy";

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <div className="space-y-4">
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

export default page;
