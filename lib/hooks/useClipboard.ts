import { useState, useCallback } from "react";

/**
 * Hook: copy text to clipboard with a timed "copied" state.
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

interface ShareButtonProps {
  linkToCopy: string;
  text?: string;
}

/**
 * Reusable Share Button component with visual confirmation.
 */
export const ShareButton: React.FC<ShareButtonProps> = ({
  linkToCopy,
  text = "Share Auction Link",
}) => {
  const { isCopied, copy } = useClipboard(3000); // 3-second confirmation

  const Icon = isCopied ? Check : Clipboard;
  const buttonText = isCopied ? "Link Copied!" : text;
  const buttonClass = isCopied
    ? "bg-green-500 hover:bg-green-600"
    : "bg-blue-600 hover:bg-blue-700";

  return (
    <button
      onClick={() => copy(linkToCopy)}
      className={`
        flex items-center justify-center py-2 px-4 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out whitespace-nowrap
        ${buttonClass}
      `}
    >
      <Icon className="w-5 h-5 mr-2" />
      {buttonText}
    </button>
  );
};
