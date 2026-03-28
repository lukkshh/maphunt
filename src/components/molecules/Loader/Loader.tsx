import styles from "./Loader.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const steps = ["3", "2", "1", "GO!"];

export default function Loader({ onDone }: { onDone?: () => void }) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < steps.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div
      className={styles.container}
      style={{ display: done ? "none" : "flex" }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={steps[index]}
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => {
            if (index === steps.length - 1) {
              onDone?.();
              setDone(true);
            }
          }}
        >
          {steps[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
