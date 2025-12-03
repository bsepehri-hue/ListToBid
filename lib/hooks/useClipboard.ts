import { useState, useCallback } from "react";

/**
 * Copy text to clipboard with a timed "copied" state.
 * @param resetInterval ms before isCopied resets (default: 2000)
 */
export const useClipboard = (resetInterval = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      // Clipboard API not available (SSR/Node)
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), resetInterval);
      })
      .catch(() => {
        // Silent fallback; avoid alert() in non-DOM contexts
      });
  }, [resetInterval]);

  return { isCopied, copy };
};
