"use client";

import { useEffect, useRef } from "react";

interface P3 { x: number; y: number; z: number }

function proj(p: P3, cx: number, cy: number, f: number) {
  const d = f / (f + p.z);
  return { x: cx + p.x * d, y: cy + p.y * d, s: d };
}

function rY(p: P3, a: number): P3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
}

function rX(p: P3, a: number): P3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

function ring(r: number, tx: number, ty: number, n: number): P3[] {
  const pts: P3[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    let p: P3 = { x: Math.cos(a) * r, y: 0, z: Math.sin(a) * r };
    p = rX(p, tx);
    p = rY(p, ty);
    pts.push(p);
  }
  return pts;
}

function sphere(r: number, la: number, lo: number): P3[][] {
  const lines: P3[][] = [];
  for (let i = 0; i <= la; i++) {
    const t = (i / la) * Math.PI;
    const line: P3[] = [];
    for (let j = 0; j <= lo; j++) {
      const p = (j / lo) * Math.PI * 2;
      line.push({ x: r * Math.sin(t) * Math.cos(p), y: r * Math.cos(t), z: r * Math.sin(t) * Math.sin(p) });
    }
    lines.push(line);
  }
  for (let j = 0; j < lo; j++) {
    const p = (j / lo) * Math.PI * 2;
    const line: P3[] = [];
    for (let i = 0; i <= la; i++) {
      const t = (i / la) * Math.PI;
      line.push({ x: r * Math.sin(t) * Math.cos(p), y: r * Math.cos(t), z: r * Math.sin(t) * Math.sin(p) });
    }
    lines.push(line);
  }
  return lines;
}

export function OrbitalBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const orbs = [
      { ri: 0, pos: 0, spd: 0.003, sz: 3 },
      { ri: 0, pos: 0.5, spd: 0.003, sz: 2 },
      { ri: 1, pos: 0.3, spd: 0.002, sz: 2.5 },
      { ri: 2, pos: 0.7, spd: 0.0015, sz: 2 },
    ];

    const draw = (t: number) => {
      if (w < 10 || h < 10) { raf = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.55;
      const cy = h * 0.42;
      const fov = 600;
      const rot = t * 0.0001;
      const R = Math.min(w * 0.35, 280);

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.2);
      grd.addColorStop(0, "rgba(139,115,230,0.06)");
      grd.addColorStop(0.5, "rgba(139,115,230,0.02)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      const sph = sphere(R * 0.42, 6, 8);
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = "#8b73e6";
      ctx.lineWidth = 0.5;
      for (const line of sph) {
        ctx.beginPath();
        for (let i = 0; i < line.length; i++) {
          const p = rY(rX(line[i], 0.2), rot);
          const pr = proj(p, cx, cy, fov);
          if (i === 0) ctx.moveTo(pr.x, pr.y); else ctx.lineTo(pr.x, pr.y);
        }
        ctx.stroke();
      }

      const rings = [
        ring(R * 0.7, 0.3, 0, 80),
        ring(R * 0.85, -0.5, 0.8, 80),
        ring(R * 0.95, 0.9, -0.3, 80),
      ];

      ctx.globalAlpha = 0.1;
      ctx.lineWidth = 0.7;
      for (const rn of rings) {
        ctx.beginPath();
        for (let i = 0; i < rn.length; i++) {
          const p = rY(rn[i], rot);
          const pr = proj(p, cx, cy, fov);
          if (i === 0) ctx.moveTo(pr.x, pr.y); else ctx.lineTo(pr.x, pr.y);
        }
        ctx.stroke();
      }

      for (const ob of orbs) {
        ob.pos = (ob.pos + ob.spd) % 1;
        const rn = rings[ob.ri];
        if (!rn || rn.length === 0) continue;
        const idx = Math.min(Math.floor(ob.pos * rn.length), rn.length - 1);
        const pt = rn[idx];
        if (!pt) continue;
        const p = rY(pt, rot);
        const pr = proj(p, cx, cy, fov);

        ctx.globalAlpha = 0.4 * pr.s;
        ctx.fillStyle = "#d9d0ff";
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, ob.sz * pr.s, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.1 * pr.s;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, ob.sz * 3 * pr.s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 40% at 55% 42%, transparent 0%, rgba(6,6,15,0.8) 50%, rgba(6,6,15,0.97) 100%)",
        }}
      />
    </>
  );
}
