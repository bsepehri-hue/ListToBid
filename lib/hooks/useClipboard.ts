^import { useState, useCallback } from 'react';
import { Check, Clipboard } from 'lucide-react';

/**
 * Custom hook to handle copying text to the clipboard and providing visual feedback.
 * * @param resetInterval The time (in ms) before the copied state resets (default: 2000ms).
 * @returns An object containing the isCopied state and the copy function.
 */
export const useClipboard = (resetInterval = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    if (typeof navigator === 'undefined' || !text) {
      console.error("Clipboard API not available or text is empty.");
      return;
    }
    
    // Note: document.execCommand('copy') is sometimes used as a fallback 
    // in older/restricted environments (like iframes), but navigator.clipboard is standard.
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, resetInterval);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      // Fallback alert for failed copy
      alert(`Failed to copy link. Please manually copy: ${text}`);
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
export const ShareButton: React.FC<ShareButtonProps> = ({ linkToCopy, text = "Share Auction Link" }) => {
    const { isCopied, copy } = useClipboard(3000); // 3-second confirmation

    const Icon = isCopied ? Check : Clipboard;
    const buttonText = isCopied ? 'Link Copied!' : text;
    const buttonClass = isCopied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700';

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
}