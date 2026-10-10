import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskLines = ({ lines, className = "", lineClassName = "" }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
        <motion.span
          className={`block ${lineClassName}`}
          initial={false}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, delay: 0.15 + i * 0.13, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

export const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={false}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);
