import { useState, useCallback } from "react";

/**
 * Hook: copy text to clipboard with a timed "copied" state.
 * @param resetInterval ms before isCopied resets (default: 2000)
 */
export const useClipboard = (resetInterval = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), resetInterval);
      })
      .catch(() => {
        // Silent fallback
      });
  }, [resetInterval]);

  return { isCopied, copy };
};