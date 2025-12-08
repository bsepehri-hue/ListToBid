"use client";
import { useState, useCallback } from "react";

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
export const ShareButton = ({
  text,
  linkToCopy,
}: {
  text: string;
  linkToCopy: string;
}) => {
  const { isCopied, copy } = useClipboard();

  return (
    <button
      onClick={() => copy(linkToCopy)}
      className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
    >
      {isCopied ? "Copied!" : text}
    </button>
  );
};
