"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const HOVERABLE_SELECTOR = "a, button, [role='button'], input, textarea, [data-cursor='hover']";
const TEXT_SELECTOR = "p, h1, h2, h3, h4, h5, h6, span, li, label";
const QUERY = "(hover: hover) and (pointer: fine)";

function subscribePointer(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener?.("change", cb);
  return () => mq.removeEventListener?.("change", cb);
}

function getPointerSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const [variant, setVariant] = useState<"default" | "hover" | "text">("default");
  const enabled = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("cursor-custom");
      return;
    }
    document.documentElement.classList.add("cursor-custom");
    return () => {
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const onLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el) return;
      if (el.closest(HOVERABLE_SELECTOR)) {
        setVariant("hover");
      } else if (el.closest(TEXT_SELECTOR)) {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    let raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, target.current.x, 0.18);
      ring.current.y = lerp(ring.current.y, target.current.y, 0.18);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize =
    variant === "hover" ? 60 : variant === "text" ? 4 : 32;
  const ringHeight = variant === "text" ? 24 : ringSize;
  const ringWidth = variant === "text" ? 2 : ringSize;
  const ringRadius = variant === "text" ? "1px" : "9999px";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9996] h-2 w-2 rounded-full bg-[var(--accent)] opacity-0 transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9996] border border-[var(--accent)]/60 opacity-0 mix-blend-difference transition-[width,height,border-radius,background-color,box-shadow,opacity] duration-200"
        style={{
          width: `${ringWidth}px`,
          height: `${ringHeight}px`,
          borderRadius: ringRadius,
          background:
            variant === "hover" ? "rgba(59,130,246,0.12)" : "transparent",
          boxShadow:
            variant === "hover"
              ? "0 0 24px rgba(59,130,246,0.5)"
              : "none",
          willChange: "transform",
        }}
      />
    </>
  );
}
