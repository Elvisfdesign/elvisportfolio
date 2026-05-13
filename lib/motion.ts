/**
 * Motion vocabulary — centralized easings and durations.
 * Everything that moves on this site goes through these constants.
 */

export const ease = {
  entrance: [0.16, 1, 0.3, 1] as const,
  exit: [0.7, 0, 0.84, 0] as const,
  soft: [0.32, 0.72, 0, 1] as const,
};

export const duration = {
  fast: 0.24,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.2,
};

export const spring = {
  magnetic: { type: "spring" as const, stiffness: 150, damping: 20, mass: 0.5 },
  soft: { type: "spring" as const, stiffness: 120, damping: 22, mass: 0.7 },
};

/**
 * Reusable variants for common patterns.
 */
export const fadeRiseVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.entrance },
  },
};

export const maskUpVariants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: ease.entrance },
  },
};
