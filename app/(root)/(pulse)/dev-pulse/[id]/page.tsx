import { FC } from "react";
import { IPulseProps, URLProps } from "@/types";
import PulseForm from "@/components/form/PulseForm";
import { pulses } from "@/constants/dummy";
import Pulse from "@/components/card/Pulse";

const findPulseById = (
  id: string,
  pulses: IPulseProps[]
): IPulseProps | undefined => {
  for (const pulse of pulses) {
    if (pulse.id === id) {
      return pulse;
    }
    const foundInEchoBack = findPulseById(id, pulse.echoBack);
    if (foundInEchoBack) {
      return foundInEchoBack;
    }
  }
  return undefined;
};

const page: FC<URLProps> = ({ params }: URLProps) => {
  const pulse = findPulseById(params.id, pulses);
  const echoBacks = pulse?.echoBack;

  return (
    <div className="size-full overflow-auto sm:rounded-lg sm:border">
      {pulse && (
        <>
          <Pulse
            key={pulse.id}
            id={pulse.id}
            author={pulse.author}
            content={pulse.content}
            photo={pulse.photo}
            isEchoBack={pulse.isEchoBack}
            echoBack={pulse.echoBack}
          />
          <PulseForm placeholder="EchoBack on DevPulse…" />
        </>
      )}
      {echoBacks?.map((echoBack: IPulseProps) => (
        <Pulse
          key={echoBack.id}
          id={echoBack.id}
          content={echoBack.content}
          author={echoBack.author}
          echoBack={echoBack.echoBack}
          photo={echoBack.photo}
          isEchoBack
        />
      ))}
    </div>
  );
};

export default page;
