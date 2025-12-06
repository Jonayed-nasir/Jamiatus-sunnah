"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

export default function useScrollFadeUp(
  offset = 0.2,
  distance = 30,
  duration = 0.6
) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: `0px 0px -${offset * 100}% 0px`,
  });

  const variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return {
    ref,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    variants,
  };
}
