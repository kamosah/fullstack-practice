import { useEffect } from "react";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  callback: (event: KeyboardEvent) => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(({ key, ctrlKey, metaKey, shiftKey, callback }) => {
        const isCtrlMatch = ctrlKey === undefined || ctrlKey === event.ctrlKey;
        const isMetaMatch = metaKey === undefined || metaKey === event.metaKey;
        const isShiftMatch =
          shiftKey === undefined || shiftKey === event.shiftKey;
        const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();

        if (isCtrlMatch && isMetaMatch && isShiftMatch && isKeyMatch) {
          event.preventDefault();
          callback(event);
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
