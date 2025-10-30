"use client";

import React, { useEffect, useRef, useState } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function DinoGame() {
  const containerRef = useRef(null);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(0);
  const [dinoY, setDinoY] = useState(0); // px from ground
  const [velocity, setVelocity] = useState(0); // px/s
  const [obstacles, setObstacles] = useState([{ x: 520, h: 36, w: 20, type: 'cactus' }]);
  const [speed, setSpeed] = useState(180); // px/s base speed
  const gravity = 900; // px/s^2
  const jumpVelocity = 400; // px/s
  const groundY = 0;

  // Load high score
  useEffect(() => {
    const saved = Number(localStorage.getItem("dino_high") || 0);
    if (!Number.isNaN(saved)) setHigh(saved);
  }, []);

  // Game loop
  useEffect(() => {
    let last = performance.now();
    let raf;
    const loop = (t) => {
      const dt = Math.min(0.032, (t - last) / 1000);
      last = t;
      if (running) {
        // Physics
        let v = velocity - gravity * dt;
        let y = Math.max(groundY, dinoY + v * dt);
        if (y === groundY && v < 0) v = 0; // landed
        setVelocity(v);
        setDinoY(y);

        // Obstacles
        setObstacles((prev) => {
          const moved = prev.map((o) => ({ ...o, x: o.x - speed * dt }));
          const filtered = moved.filter((o) => o.x + o.w > -10);
          // Easier: only one obstacle at a time; spawn a new one after previous exits
          if (filtered.length === 0) {
            const h = 28 + Math.floor(Math.random() * 12); // 28-40
            const w = 18;
            const type = Math.random() < 0.6 ? 'cactus' : 'tree';
            filtered.push({ x: 560 + Math.random() * 100, h, w, type });
          }
          return filtered;
        });

        // Score and speed ramp
        setScore((s) => s + Math.floor(dt * 100));
        setSpeed((sp) => clamp(sp + dt * 1.5, 100, 180));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, velocity, dinoY, speed]);

  // Collision detection
  useEffect(() => {
    // Scene dimensions
    const dinoX = 64; // left position
    const dinoW = 34;
    const dinoH = 30 + dinoY; // effective vertical span
    const groundTop = 24; // distance from bottom where ground runs
    const dinoBottom = groundTop + dinoY;
    const dinoTop = dinoBottom - 28;

    for (const o of obstacles) {
      const ox1 = o.x;
      const ox2 = o.x + o.w;
      const oy2 = groundTop; // bottom at ground line
      const oy1 = oy2 - o.h;
      const dx1 = dinoX;
      const dx2 = dinoX + dinoW;
      if (dx1 < ox2 && dx2 > ox1 && dinoTop < oy2 && dinoBottom > oy1) {
        // Hit
        setRunning(false);
        setHigh((h) => {
          const next = Math.max(h, score);
          localStorage.setItem("dino_high", String(next));
          return next;
        });
        break;
      }
    }
  }, [obstacles, dinoY, score]);

  const jump = () => {
    if (!running) return;
    // Allow tiny tolerance so it feels instant at ground contact
    if (dinoY <= groundY + 0.5) {
      setVelocity(jumpVelocity);
    }
  };

  const reset = () => {
    setRunning(true);
    setScore(0);
    setDinoY(0);
    setVelocity(0);
    setObstacles([{ x: 520, h: 36, w: 12 }]);
    setSpeed(180);
  };

  // Controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      if (!running && (e.code === "Enter" || e.code === "KeyR")) {
        reset();
      }
    };
    const onPointer = () => (running ? jump() : reset());
    window.addEventListener("keydown", onKey);
    containerRef.current?.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      containerRef.current?.removeEventListener("pointerdown", onPointer);
    };
  }, [running, dinoY]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-xl h-40 relative select-none cursor-pointer rounded-md bg-white/5 border border-white/10" aria-label="Dino game. Tap or press Space to jump.">
      {/* HUD */}
      <div className="absolute top-0 right-0 text-[11px] text-slate-300/90 font-mono p-1">
        HI {String(high).padStart(5, "0")} | {String(score).padStart(5, "0")}
      </div>

      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="dino-cloud absolute top-2 right-[-10%] h-3 w-14 rounded-full bg-white/30 blur-sm" />
        <div className="dino-cloud absolute top-8 right-[-30%] h-2.5 w-10 rounded-full bg-white/25 blur-[2px]" style={{ animationDuration: '36s' }} />
        <div className="dino-cloud absolute top-4 right-[-60%] h-3.5 w-16 rounded-full bg-white/20 blur-sm" style={{ animationDuration: '44s' }} />
      </div>

      {/* Dino */}
      <div className="absolute left-6 z-10" style={{ bottom: `${6 + dinoY}px` }}>
        <svg viewBox="0 0 80 64" width="96" height="76" className="fill-white/90 drop-shadow">
          <rect x="18" y="14" width="30" height="18" rx="3" />
          <rect x="40" y="20" width="16" height="12" rx="2" />
          <rect x="34" y="32" width="10" height="6" />
          <rect x="26" y="32" width="10" height="6" />
          <rect x="28" y="38" width="6" height="10" />
          <rect x="38" y="38" width="6" height="10" />
          <rect x="12" y="18" width="10" height="8" rx="2" />
          <circle cx="24" cy="20" r="1.5" fill="#0f172a" />
        </svg>
      </div>

      {/* Obstacles */}
      <div className="absolute bottom-6 inset-x-0 overflow-visible z-50">
        {obstacles.map((o, i) => (
          <div key={`obs-${i}`} className="absolute" style={{ left: `${o.x}px`, bottom: 0 }}>
            {o.type === 'tree' ? (
              <svg viewBox="0 0 24 64" width={o.w * 3.2} height={o.h} className="drop-shadow-lg">
                {/* Simple pine tree */}
                <rect x="10" y="42" width="4" height="22" fill="#2b2b2b" />
                <polygon points="12,6 2,26 22,26" fill="#16a34a" />
                <polygon points="12,16 3,34 21,34" fill="#22c55e" />
                <polygon points="12,24 4,42 20,42" fill="#16a34a" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 40" width={o.w * 3} height={o.h} className="drop-shadow-lg">
                {/* Cactus */}
                <path d="M9 40V12c0-2 2-4 4-4s4 2 4 4v10h-4V12c0-.6-.4-1-1-1s-1 .4-1 1v28H9zM5 40V22c0-1.6 1.4-3 3-3h1v6H9v15H5z" fill="#22c55e" stroke="#166534" strokeWidth="0.8"/>
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Ground */}
      <div className="absolute bottom-4 left-0 w-[200%] h-[3px] dino-ground" />

      {/* Game over */}
      {!running && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-md bg-black/50 px-3 py-2 text-xs text-white/90 font-mono">
            GAME OVER – Press Enter or Tap to restart
          </div>
        </div>
      )}
    </div>
  );
}


