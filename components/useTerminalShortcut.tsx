"use client";

import { useEffect, useRef } from "react";

const TRIGGER = "bryan";

export function useTerminalShortcut(onTrigger: () => void) {
  const bufferRef = useRef("");
  const onTriggerRef = useRef(onTrigger);

  useEffect(() => {
    onTriggerRef.current = onTrigger;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k.length !== 1 || !/[a-z]/.test(k)) {
        bufferRef.current = "";
        return;
      }
      const next = (bufferRef.current + k).slice(-TRIGGER.length);
      bufferRef.current = next;
      if (next === TRIGGER) {
        bufferRef.current = "";
        onTriggerRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
