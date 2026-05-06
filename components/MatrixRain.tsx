"use client";

import { useEffect, useRef } from "react";

const GLYPHS =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプ0123456789ABCDEF<>?:#$%&";

export default function MatrixRain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.random() * -50);

    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(10, 14, 26, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = "#3b82f6";
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const stop = setTimeout(() => onDone(), 5000);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      clearTimeout(stop);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[10001]"
    />
  );
}
