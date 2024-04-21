import { FC } from "react";
import Pulse from "@/components/card/Pulse";

import { pulses } from "@/constants/dummy";
import PulseForm from "@/components/form/PulseForm";

interface pageProps {}

const Page: FC<pageProps> = () => {
  return (
    <>
      <header className="flex py-4">
        <h1 className="line-clamp-2 text-2xl font-bold sm:text-3xl">
          Stay on the pulse of the latest in development
        </h1>
      </header>

      <div className="flex gap-4">
        <div className="size-full space-y-4 overflow-auto sm:rounded-lg sm:border">
          <PulseForm />
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

        <aside className="sticky right-0 top-2 flex h-full flex-col rounded-lg border p-6 max-xl:hidden sm:w-[600px]">
          Recommendation Section
        </aside>
      </div>
    </>
  );
};

export default Page;
