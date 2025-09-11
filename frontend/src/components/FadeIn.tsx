'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function FadeIn({
  children,
  delay = 0,
  whileInView = false,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  whileInView?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      {...(!whileInView && {
        animate: { opacity: 1, y: 0 },
      })}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      {...(whileInView && {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      })}
      className={className}
    >
      {children}
    </motion.div>
  );
}
