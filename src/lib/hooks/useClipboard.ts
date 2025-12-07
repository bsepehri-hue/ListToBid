"use client";

import { useState, useCallback } from "react";

/**
 * Hook: copy text to clipboard with a timed "copied" state.
 * @param resetInterval ms before isCopied resets (default: 2000)
 */
export const useClipboard = (resetInterval = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), resetInterval);
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }
    },
    [resetInterval]
  );

  return { isCopied, copy };
};

/**
 * ShareButton: wraps the hook into a button that copies text.
 */
export const ShareButton = ({ text }: { text: string }) => {
  const { isCopied, copy } = useClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
    >
      {isCopied ? "Copied!" : "Share"}
    </button>
  ); // ✅ closes the return (
};