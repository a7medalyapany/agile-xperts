"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IconName, cn } from "@/lib/utils";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";

export const AnimatedTooltip = ({
  items,
  className,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="group relative -mr-4"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === idx && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX,
                rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -left-1/2 -top-16 z-50 flex translate-x-1/2 flex-col items-center justify-center rounded-md bg-popover px-3 py-2 text-xs shadow-xl"
            >
              <div className="absolute inset-x-10 -bottom-px z-30 h-px w-1/5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              <div className="absolute -bottom-px z-30 h-px w-2/5 bg-gradient-to-r from-transparent via-primary to-transparent " />
              <div className="relative z-30 text-sm font-bold text-foreground">
                {item.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.designation}
              </div>
            </motion.div>
          )}
          <Image
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={
              `/assets/icons/technologies/${IconName(item.name)}.svg` ||
              "/assets/icons/technologies/default.svg"
            }
            alt={item.name}
            className={cn(
              `relative bg-white !m-0 size-14 rounded-full border border-primary object-cover object-top !p-0 transition duration-500  group-hover:z-30 group-hover:scale-105`,
              className
            )}
          />
        </div>
      ))}
    </>
  );
};
